'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import NotAllowed from '@/components/NotAllowed';
import Nav from '@/components/Nav';
import '../../add-product/AddProduct.css';
import { useStateContext } from '@/components/StateContext';
const EditProduct = () =>
{
    const [tittle, setTittle] = useState();
    const [desc, setDesc] = useState();
    const [amount, setAmount] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const { user } = useStateContext();

    useEffect(() =>
    {

        user == 'admin' ?
            axios.get(`${process.env.NEXT_PUBLIC_SERVER}${location.pathname}`)
                .then(res =>
                {
                    setTittle(res.data.title);
                    setDesc(res.data.description);
                    setPrice(res.data.price);
                    setAmount(res.data.amount);
                    setCategory(res.data.category);
                })
                .catch(err => console.log(err)) : null;
    }, []);

    const editPro = () =>
    {
        axios.put(`${process.env.NEXT_PUBLIC_SERVER}${location.pathname}`, { 'tittle': tittle, "price": price, "amount": amount, "category": category, "desc": desc })
            .then(res => res.data == 'edited' ? location.pathname = '/all-products' : null)
            .catch(err => console.log(err));
    };





    return (
        <>
            {user == 'admin' ? <>
                <Nav />
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
            </> : <NotAllowed />}

        </>
    );
};

export default EditProduct;