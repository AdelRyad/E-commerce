'use client';
import Cart from '@/app/components/Cart';
import Nav from '@/app/components/Nav';
import { useStateContext } from '@/app/components/StateContext';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import img from '../../../../public/imgs/1.jpg';

const Product = () =>
{
    const [product, setProduct] = useState({});

    useEffect(() =>
    {
        axios.get(`http://localhost:3001${location.pathname}`)
            .then(res => setProduct(res.data))
            .catch(err => console.log(err));
    }, []);



    const { AddtoCart } = useStateContext();
    return (
        <>
            <Cart />
            <Nav />
            <div className='product-page'>
                <div className="product-details">
                    <div className="product-imgs">
                        <Image alt='' src={img} className='preview-img' />
                        <div className="all-imgs">
                            <Image alt='' src={img} className='small-img' />
                            <Image alt='' src={img} className='small-img' />
                            <Image alt='' src={img} className='small-img' />
                            <Image alt='' src={img} className='small-img' />

                        </div>
                    </div>
                    <div className="product-desc">
                        <p className="product-tittle">{product.tittle}</p>
                        <p className="desc">{product.desc}</p>
                        <p className="product-price">{product.price}$</p>
                        <button id={product._id} className="add" onClick={(e) =>
                        {
                            AddtoCart(e.target.id);
                        }}>add to cart</button>
                        <button className="buy">buy now</button>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Product;