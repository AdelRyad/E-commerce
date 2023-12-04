'use client';
import './all.css';
import { useState } from 'react';
const CartProduct = ({ tittle, price }) =>
{




    const [qty, setQty] = useState(1);
    const incQty = () =>
    {
        setQty(qty + 1);
    };
    const decQty = () =>
    {
        setQty((prevQty) =>
        {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        }
        );
    };





    return (
        <div className='cart-pro'>
            <div className='cart-img' ></div>
            <p className="pro-tittle">{tittle}</p>
            <p className='pro-price'>{price}$</p>
            <div className='pro-count'>
                <button onClick={decQty}>-</button>
                <span >{qty}</span>
                <button onClick={incQty}>+</button>
            </div>
            <p className='delte-cart'>delete</p>
        </div>
    );




};

export default CartProduct;