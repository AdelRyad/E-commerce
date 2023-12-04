'use client';
import CartProduct from './CartProduct';
import Link from 'next/link';
import { useStateContext } from './StateContext';
import './styles/Cart.css';


const Cart = () =>
{

  const { showCart, setShowCart, totalPrice, cartProduct, getTotal } = useStateContext();
  const checkout = () =>
  {
    sessionStorage.setItem('products', JSON.stringify(cartProduct));
  };

  if (showCart)
  {
    getTotal();
    return (
      <>
        <div className="lay-out" onClick={() =>
        {
          setShowCart(false);
          document.body.style.position = 'initial';
        }}></div>
        <div className="cart">
          <div className="cart-cont">
            <h1>Cart</h1>
            <div className='cart-products'>
              {
                cartProduct.map(product => <CartProduct title={product.title} image={product.image} price={product.price} key={product._id} id={product._id} qty={product.qty} />)
              }
            </div>
            <div className='cart-check'>
              <h3>Total: <span>{totalPrice.toFixed(2)}</span>$</h3>
              {cartProduct.length > 0 ? <Link href={"/checkout"} onClick={checkout}>Check Out</Link> : null}
            </div>
          </div>
        </div>
      </>
    );
  }





};



export default Cart;