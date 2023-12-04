'use client';
import Cart from '@/components/Cart';
import Nav from '@/components/Nav';
import './ProductPage.css';
import { useStateContext } from '@/components/StateContext';
import axios from 'axios';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const Product = () =>
{
    const [product, setProduct] = useState({});

    useEffect(() =>
    {
        axios.get(`${process.env.SERVER}${location.pathname}`)
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
                        <Image src={product.image} width={1000} height={1000} quality={100} className='preview-img' />
                    </div>
                    <div className="product-desc">
                        <p className="product-tittle">{product.title}</p>
                        <p className="desc">{product.description}</p>
                        <p className="product-price">{product.price}$</p>
                        <button id={product._id} className="add" onClick={(e) =>
                        {
                            AddtoCart(e.target.id);
                        }}>add to cart</button>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Product;