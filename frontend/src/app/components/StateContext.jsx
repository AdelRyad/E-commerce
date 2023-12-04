'use client';
import axios from "axios";
const { createContext, useState, useContext, useEffect } = require("react");

const context = createContext();

export const StateContext = ({ children }) =>
{
  const [showCart, setShowCart] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQty, setTotalQty] = useState(0);



  const [cartProduct, setCartPorduct] = useState([]);

  const AddtoCart = (productId) =>
  {

    products.map(product =>
    {
      if (product._id == productId)
      {
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


  const [products, setPorducts] = useState([]);
  const getProducts = () =>
  {
    axios.get('http://localhost:3001/products')
      .then(result =>
      {
        setPorducts(result.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() =>
  {
    if (products.length == 0)
    {
      getProducts();
    }
    else
    {
      setTimeout(() =>
      {
        getProducts();
      }, 60000);
    }

  }, [products]);


  const deleteProduct = (Id) =>
  {
    axios.delete(`http://localhost:3001/delete/${Id}`)
      .then(res => res.data == 'deleted')
      .catch(err => console.log(err));
  };


  const [categories, setCategories] = useState([]);
  useEffect(() =>
  {
    products.map(product =>
    {
      categories.includes(product.category) ? null : setCategories(categories.concat(product.category));
    });
    categories.sort();
  }, [categories, products]);


  function scrollL(ele)
  {
    ele.target.nextSibling.scrollBy({
      left: -(ele.target.nextSibling.clientWidth + 10),
      top: 0,
      behavior: 'smooth'
    });
  }
  function scrollR(ele)
  {
    ele.target.previousSibling.scrollBy({
      left: (ele.target.previousSibling.clientWidth + 10),
      top: 0,
      behavior: 'smooth'
    });
  }


  const removeScroll = () =>
  {
    const catCards = document.querySelectorAll('.cat-cards');
    catCards.forEach(cat =>
    {
      if (cat.childElementCount <= 4)
      {
        cat.previousSibling.replaceWith('');
        cat.nextSibling.replaceWith('');
      }
    });
  };


  const showNav = () =>
  {
    document.querySelector('.links').classList.toggle('mobile-nav');
  };





  return (
    <context.Provider
      value={{
        showCart,
        setShowCart,
        totalPrice,
        setTotalPrice,
        totalQty,
        setTotalQty,
        cartProduct,
        setCartPorduct,
        products,
        AddtoCart,
        deleteProduct,
        categories,
        scrollL,
        scrollR,
        removeScroll,
        showNav




      }}>
      {children}
    </context.Provider>
  );


};


export const useStateContext = () => useContext(context);