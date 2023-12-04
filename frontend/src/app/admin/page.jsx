'use client';
import React from 'react';
import './Admin.css';
import Link from 'next/link';
import { useStateContext } from '../../components/StateContext';
import NotAllowed from '../../components/NotAllowed';


const Admin = () =>
{
    const { user } = useStateContext();
    return (
        <>
            {user == 'admin' ? <>
                <div className='admin'>
                    <h1>Admin Page</h1>
                    <Link className="admin-card" href={'/all-products'} >
                        <h1>All Products</h1>
                    </Link>
                    <Link href={'/add-product'} className="admin-card">
                        <h1>Add Product</h1>
                    </Link>
                    <Link href={'/admins'} className="admin-card">
                        <h1>Admins</h1>
                    </Link>
                    <Link href={'/users'} className="admin-card">
                        <h1>Users</h1>
                    </Link>
                    <Link href={'/orders'} className="admin-card">
                        <h1>Orders</h1>
                    </Link>
                </div>
            </> : <NotAllowed />}

        </>

    );
};

export default Admin;