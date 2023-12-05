'use cilent';
import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
const Orders = ({ order }) =>
{
    const [showpProducts, SetShowpProducts] = useState(false);
    return (
        <div className="order">
            <div className="user-info">
                <p className="name">UserName<br /> {order.name}</p>
                <p className="email">Email<br /> {order.email}</p>
                <p className="adress">Adress<br /> {order.adress}</p>
                <p className="total">Total<br /> {order.total}</p>
                <button className='btn' onClick={() => SetShowpProducts(!showpProducts)}>&#10148;</button>
            </div>
            <div className={`products ${showpProducts ? 'show-products' : ''}`}>
                {order.products.map(product => <div key={product._id} className='product'>
                    <Image key={product._id} src={product.image} width={100} height={100} alt='' />
                    <p className="product-title">{product.title}</p>
                    <p className="product-qty">qty: {product.qty}</p>
                    <p className="product-price">{product.price}$</p>
                </div>)}
            </div>
        </div>
    );
};

export default Orders;