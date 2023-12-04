'use client';
import React, { useContext, useEffect, useState } from 'react';
import CartProduct from './CartProduct';
import Link from 'next/link';
import './all.css';
import { useStateContext } from './StateContext';
import getStripe from '../lib/getStripe';


const Cart = () =>
{

  const { showCart, setShowCart, totalPrice, setTotalPrice, cartProduct } = useStateContext();


  const handleCheckOut = async () =>
  {
    const stripe = await getStripe();
    const response = await fetch('/api/stripe',
      {
        method: 'POST',
        headers: {
          'Content-Typr': 'application/json',
        },
        body: JSON.stringify(cartProduct)
      });
    if (response.status === 500) return;
    const data = await response.json();
    stripe.redirectToCheckout({ sessionId: data.id });


  };



  if (showCart)
  {
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
                cartProduct.map(product => <CartProduct tittle={product.tittle} price={product.price} key={product._id} />)
              }
            </div>
            <div className='cart-check'>
              <h3>Total: <span>{totalPrice}</span></h3>
              <Link href={"/"} onClick={handleCheckOut}>Check Out</Link>
            </div>
          </div>
        </div>
      </>
    );
  }





};



export default Cart;;;