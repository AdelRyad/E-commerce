'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import './all.css';


const AdminNav = () =>
{


    return (
        <div className="nav">
            <Link href={'/'} className="logo">E-Commerce</Link>
            <ul className="links">
                <Link href={"/admin"} className="link">Admin</Link>
                <Link href={'/all-products'} className="link">Products</Link>
                <Link href={'/add-product'} className="link">Add Product</Link>
                <Link href={'/orders'} className="link">Orders</Link>
            </ul>
        </div>

    );
};





export default AdminNav;