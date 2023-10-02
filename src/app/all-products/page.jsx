'use client';
import AdminNav from '../components/AdminNav';
import { useStateContext } from '../components/StateContext';
import Products from './Products';

const Pro = () =>
{
    const { categories } = useStateContext();


    return (
        <>
            <AdminNav />
            <div className='all-products'>
                <h1>All Products</h1>
                {categories.map(category => <Products key={category} category={category} />)}
            </div>
        </>
    );
};

export default Pro;