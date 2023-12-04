'use client';
import React from 'react';
import '../components/all.css';
import axios from 'axios';
import { useState } from 'react';
import AdminNav from '../components/AdminNav';
const AddProduct = () =>
{
    const [tittle, setTittle] = useState();
    const [desc, setDesc] = useState();
    const [amount, setAmount] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();

    function handleAdd()
    {
        axios.post('http://localhost:3001/new-product', { "tittle": tittle, "desc": desc, "amount": amount, "price": price, "category": category })
            .then(res =>
            {
                res.data == 'created' ? location.pathname = '/all-products' : null;
            })
            .catch(err => console.log(err));
    }

    let oldPlace;
    function PlacFoucs(e)
    {
        oldPlace = e.target.placeholder;
        e.target.placeholder = '';
    }

    function PlaceBlur(e)
    {
        e.target.placeholder = oldPlace;
    }
    return (
        <>
            <AdminNav />
            <div className='add-product'>
                <div className="product">
                    <h1>Add New Product</h1>
                    <input type='file' />
                    <input type='text' placeholder='Tittle' onChange={e => setTittle(e.target.value)} onFocus={PlacFoucs} onBlur={PlaceBlur} />
                    <input type='text' placeholder='Category' onChange={e => setCategory(e.target.value)} onFocus={PlacFoucs} onBlur={PlaceBlur} />
                    <textarea placeholder='Descrption' onChange={e => setDesc(e.target.value)} onFocus={PlacFoucs} onBlur={PlaceBlur} />
                    <input type='text' placeholder='Amount' onChange={e => setAmount(e.target.value)} onFocus={PlacFoucs} onBlur={PlaceBlur} />
                    <input type='text' placeholder='Price' onChange={e => setPrice(e.target.value)} onFocus={PlacFoucs} onBlur={PlaceBlur} />
                    <button className='submit' onClick={handleAdd}>Add</button>
                </div>
            </div>
        </>
    );
};

export default AddProduct;