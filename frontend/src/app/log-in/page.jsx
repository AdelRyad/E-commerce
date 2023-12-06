'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import './LogIn.css';
import axios from 'axios';

const LogIn = () =>
{

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    function handleLog()
    {
        if (email.trim() != '' && password.trim() != '')
        {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER}/user`, { "email": email, "password": password }, { withCredentials: true })
                .then(res =>
                {
                    sessionStorage.setItem('jwt', res.data[1]);
                    res.data[0] == 'user' ? location.pathname = '/' :
                        res.data[0] == 'admin' ? location.pathname = '/admin' :
                            setError(res.data);
                })
                .catch(err => console.log(err));
        }
        else
        {
            email.trim() == '' ? setError('enter the email') :
                password.trim() == '' ? setError('enter the password') :
                    setError('');
        }

    }

    function Placeholder(e)
    {
        if (e.target.placeholder !== '')
        {
            e.target.placeholder = '';
        }
        else
        {
            e.target.placeholder = e.target.type;
        }
    }

    return (
        <>

            <div className="log">
                <div className='form'>
                    <h1>Log In</h1>
                    <div className="inp">
                        <input type="email" className='email' placeholder='email' onBlur={Placeholder} onFocus={Placeholder} onChange={e => setEmail(e.target.value)} />
                        <input type="password" className='password' placeholder='password' onBlur={Placeholder} onFocus={Placeholder} onChange={e => setPassword(e.target.value)} />
                    </div>
                    {error && <p className='error'>{error}</p>}
                    <Link href={"/"} className='forget'>forget the password ?</Link >
                    <button className='submit' onClick={handleLog}>Log In</button>
                    <p className='p'>OR</p>
                    <Link className='submit' href={"/sign-up"}>Sign Up</Link>
                </div>
            </div >
        </>
    );
};

export default LogIn;