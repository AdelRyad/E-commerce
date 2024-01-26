'use client';
import React from 'react';
import './AddProduct.css';
import axios from 'axios';
import { useState } from 'react';
import Nav from '../../components/Nav';
import { useStateContext } from '../../components/StateContext';
import NotAllowed from '../../components/NotAllowed';
const AddProduct = () =>
{
    const { user } = useStateContext();
    const [ tittle, setTittle ] = useState();
    const [ desc, setDesc ] = useState();
    const [ amount, setAmount ] = useState();
    const [ price, setPrice ] = useState();
    const [ category, setCategory ] = useState();



    function handleAdd ()
    {
        user == 'admin' ? axios.post( `${ process.env.NEXT_PUBLIC_SERVER }/new-product`, { "tittle": tittle, "desc": desc, "amount": amount, "price": price, "category": category } )
            .then( res =>
            {
                res.data == 'created' ? location.pathname = '/all-products' : null;
            } )
            .catch( err => console.log( err ) ) : null;
    }

    let oldPlace;
    function PlacFoucs ( e )
    {
        oldPlace = e.target.placeholder;
        e.target.placeholder = '';
    }

    function PlaceBlur ( e )
    {
        e.target.placeholder = oldPlace;
    }
    return (
        <>
            { user == 'admin' ? <>
                <Nav />
                <div className='add-product' >
                    <div className="product">
                        <h1>Add New Product</h1>
                        <input type='file' />
                        <input type='text' placeholder='Tittle' onChange={ e => setTittle( e.target.value ) } onFocus={ PlacFoucs } onBlur={ PlaceBlur } />
                        <input type='text' placeholder='Category' onChange={ e => setCategory( e.target.value ) } onFocus={ PlacFoucs } onBlur={ PlaceBlur } />
                        <textarea placeholder='Descrption' onChange={ e => setDesc( e.target.value ) } onFocus={ PlacFoucs } onBlur={ PlaceBlur } />
                        <input type='number' placeholder='Amount' onChange={ e => setAmount( e.target.value ) } onFocus={ PlacFoucs } onBlur={ PlaceBlur } />
                        <input type='number' placeholder='Price' onChange={ e => setPrice( e.target.value ) } onFocus={ PlacFoucs } onBlur={ PlaceBlur } />
                        <button className='submit' onClick={ handleAdd }>Add</button>
                    </div>
                </div>
            </> : <NotAllowed />
            }

        </>
    );
};

export default AddProduct;