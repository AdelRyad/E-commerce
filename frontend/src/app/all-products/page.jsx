'use client';
import Nav from '../../components/Nav';
import NotAllowed from '../../components/NotAllowed';
import './AllProducts.css';
import Products from './Products';
import { useStateContext } from '@/components/StateContext';
import { useState } from 'react';

const AllProducts = () =>
{
    const { products, user } = useStateContext();
    const [categories, setCategories] = useState([]);
    products.map(pro => categories.includes(pro.category) ? null : setCategories(categories.concat(pro.category)));
    return (
        <>{
            user === 'admin' ? <>
                <Nav />
                <div className='all-products'>
                    <h1>All Products</h1>
                    {categories.map(category => <Products key={category} category={category} />)}
                </div></> : <NotAllowed />
        }



        </>
    );
};

export default AllProducts;