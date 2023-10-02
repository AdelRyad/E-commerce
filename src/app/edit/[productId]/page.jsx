'use client';

import { useEffect, useState } from 'react';
import AdminNav from '@/app/components/AdminNav';
import axios from 'axios';
const EditProduct = () =>
{
    const [tittle, setTittle] = useState();
    const [desc, setDesc] = useState();
    const [amount, setAmount] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();


    useEffect(() =>
    {

        axios.get(`http://localhost:3001${location.pathname}`)
            .then(res =>
            {
                setTittle(res.data.tittle);
                setDesc(res.data.desc);
                setPrice(res.data.price);
                setAmount(res.data.amount);
                setCategory(res.data.category);
            })
            .catch(err => console.log(err));
    }, []);

    const editPro = () =>
    {
        axios.put(`http://localhost:3001${location.pathname}`, { 'tittle': tittle, "price": price, "amount": amount, "category": category, "desc": desc })
            .then(res => res.data == 'edited' ? location.pathname = '/all-products' : null)
            .catch(err => console.log(err));
    };





    return (
        <>
            <AdminNav />
            <div className='add-product'>
                <div className="product">
                    <h1>Add New Product</h1>
                    <input type='file' />
                    <input type='text' value={tittle} onChange={e => setTittle(e.target.value)} />
                    <input type='text' value={category} onChange={e => setCategory(e.target.value)} />
                    <textarea value={desc} onChange={e => setDesc(e.target.value)} />
                    <input type='text' value={amount} onChange={e => setAmount(e.target.value)} />
                    <input type='text' value={price} onChange={e => setPrice(e.target.value)} />
                    <button className='submit' onClick={editPro}>Edit</button>
                </div>
            </div>
        </>
    );
};

export default EditProduct;