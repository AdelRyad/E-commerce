'use client';
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import '../components/all.css';


const SignUP = () =>
{
    const [username, setUserName] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () =>
    {
        if (username.trim() != '' && email.trim() != '' && password.trim != '' && password == confirmPassword)
        {
            axios.post('http://localhost:3001/new-user', { "username": username, "email": email, "password": password, "role": "user" })
                .then(result =>
                {
                    result.data = 'created' ? location.pathname = '/log-in' : null;
                })
                .catch(err => console.log(err));
        }
        else
        {
            username.trim() == '' ? setError("enter the username") :
                email.trim() == '' ? setError('enter the email') :
                    password.trim() == '' ? setError('enter the password') :
                        password != confirmPassword ? setError("the password dos'nt match")
                            : setError('');
        }
        ;
    };
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

            <div className="log">
                <div className='form'>
                    <h1>Sign Up</h1>
                    <div className="inp">
                        <input type="text" className='username email' placeholder='username' onBlur={PlaceBlur} onFocus={PlacFoucs} onChange={e => setUserName(e.target.value)} required />
                        <input type="email" className='email' placeholder='email' onBlur={PlaceBlur} onFocus={PlacFoucs} onChange={e => setEmail(e.target.value)} required />
                        <input type="password" className='password' placeholder='password' onBlur={PlaceBlur} onFocus={PlacFoucs} onChange={e => setPassword(e.target.value)} required />
                        <input type="password" className='confirm password' placeholder='confirm password' onBlur={PlaceBlur} onFocus={PlacFoucs} onChange={e => setConfirmPassword(e.target.value)} required />
                    </div>
                    {error && <p className='error'>{error}</p>}
                    <button className='submit' onClick={handleSubmit}>Sign Up</button>
                    <p className='p'>OR</p>
                    <Link className='submit' href={"/log-in"}>Log In</Link>
                </div>
            </div>
        </>
    );
};

export default SignUP;