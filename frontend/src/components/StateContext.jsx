'use client';
import axios from "axios";
const { createContext, useState, useContext, useEffect, use } = require("react");

const context = createContext();

export const StateContext = ({ children }) =>
{
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProduct, setCartPorduct] = useState([]);
  const [products, setPorducts] = useState([]);
  // fetching data

  const getProducts = () =>
  {
    axios.get(`${process.env.SERVER}/products`).then(res => setPorducts(res.data));
  };
  useEffect(() =>
  {
    getProducts();
  }, []);

  // add products to cart
  const AddtoCart = (productId) =>
  {
    products.map(product =>
    {
      if (product._id == productId)
      {
        product.qty = 1;
        if (cartProduct.length == 0)
        {
          setCartPorduct(cartProduct.concat(product));
        }
        else
        {
          for (let i = 0; i < cartProduct.length; i++)
          {
            if (cartProduct[i]._id == productId)
            {
              cartProduct.splice(i, 1);
              setCartPorduct(cartProduct.concat(product));
            }
            else
            {
              setCartPorduct(cartProduct.concat(product));
            }
          }
        }
      };
    });
  };
  // handle quantity of cart products

  const handleQty = (id, meth) =>
  {
    cartProduct.map(product =>
    {
      if (product._id == id)
      {
        let newProduct;
        let index = cartProduct.indexOf(product);
        if (meth == 'inc')
        {
          newProduct = product;
          newProduct.qty++;
        }
        else
        {
          newProduct = product;
          if (product.qty > 1)
          {
            product.qty--;
          }
        }
        cartProduct.splice(index, 1, newProduct);
        getTotal();
      }
    });
  };

  // calculate total price for cart

  const getTotal = () =>
  {
    let total = 0;
    cartProduct.map(pro =>
    {
      total += +pro.price * +pro.qty;
    });
    setTotalPrice(total);
  };


  // delet product from cart

  const handleRemoveCart = (id) =>
  {
    for (let i = 0; i < cartProduct.length; i++)
    {
      if (cartProduct[i]._id == id)
      {
        cartProduct.splice(i, 1);
        getTotal();
      }
    };
  };


  // delet product from store 
  const deleteProduct = (Id) =>
  {
    axios.delete(`${process.env.SERVER}/delete/${Id}`)
      .then(res => res.data == 'deleted' ? getProducts() : null)
      .catch(err => console.log(err));
  };



  // protecting rouets

  const [user, setUser] = useState();
  const checkUser = () =>
  {
    const token = sessionStorage.getItem('jwt');
    axios.post(`${process.env.SERVER}/check-user`, { 'token': token })
      .then(res => setUser(res.data))
      .catch(err => console.log(err));

  };

  useEffect(() =>
  {
    checkUser();
  }, []);

  // scrolling functions 
  function scrollL(ele)
  {
    ele.target.nextSibling.scrollBy({
      left: -(ele.target.nextSibling.clientWidth + 13),
      top: 0,
      behavior: 'smooth'
    });
  }
  function scrollR(ele)
  {
    ele.target.previousSibling.scrollBy({
      left: (ele.target.previousSibling.clientWidth + 13),
      top: 0,
      behavior: 'smooth'
    });
  }

  return (
    <context.Provider
      value={{
        showCart,
        setShowCart,
        totalPrice,
        getTotal,
        setTotalPrice,
        cartProduct,
        setCartPorduct,
        products,
        AddtoCart,
        deleteProduct,
        handleRemoveCart,
        handleQty,
        user,
        setUser,
        checkUser,
        scrollL,
        scrollR




      }}>
      {children}
    </context.Provider>
  );


};


export const useStateContext = () => useContext(context);