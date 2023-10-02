'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import './all.css';
import { useStateContext } from './StateContext';


const Nav = () =>
{
    const { showCart, setShowCart, showNav, cartProduct } = useStateContext();


    useEffect(() =>
    {

        const searchBtn = document.querySelector(".btn");
        const search = document.querySelector(".search");
        let searchOp = false;
        searchBtn.addEventListener('click', () =>
        {
            if (!searchOp)
            {
                search.style.display = 'block';
                search.focus();
                searchBtn.classList.add('active');
                searchOp = true;
            }
            else
            {
                search.style.display = 'none';
                searchBtn.classList.remove('active');
                searchOp = false;
            }
        }
        );
    }, []);

    return (
        <div className="nav">
            <Link href={'/'} className="logo">E-Commerce</Link>
            <ul className="links">
                <Link href={"/"} className="link">Home</Link>
                <button className='link btn'>search</button>
                <input type='text' className="search" />
                <li className="link" onClick={() =>
                {
                    showCart == false ? setShowCart(true) : setShowCart(false);
                    document.body.style.position = 'fixed';
                    document.body.style.width = '100%';
                }}>Cart-{cartProduct.length}</li>
            </ul>
            <div className="sign">
                <Link href={'/sign-up'} className='sign-up'>Sign Up</Link>
                <Link href={'/log-in'} className="log-in">Log In</Link>
            </div>
            <button className='show-nav' onClick={showNav}>show</button>
        </div>

    );
};





export default Nav;