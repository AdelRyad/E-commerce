'use client';
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import '../log-in/LogIn.css';


const SignUP = () =>
{
    const [username, setUserName] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = () =>
    {
        const emailValdiation = /^\w+@\w+.\w{2,6}/g;
        const passwordValdiation = /.{8,15}/g;
        const nameValidation = /^[a-z]+\s?\w+?/gi;
        const eCheck = emailValdiation.test(email);
        const pCheck = passwordValdiation.test(password);
        const nCheck = nameValidation.test(username);

        if (username.trim() !== '' && eCheck && pCheck && password == confirmPassword && nCheck)
        {
            axios.post('http://localhost:3001/new-user', { "username": username, "email": email, "password": password, "role": "user" })
                .then(result =>
                {
                    result.data != 'created' ? setError(result.data) : location.pathname = '/log-in';
                })
                .catch(err => console.log(err));
        }
        else
        {
            username.trim() == '' ? setError('enter username') :
                nCheck === false ? setError('Invalied username') :
                    eCheck === false ? setError('Invalied email') :
                        pCheck === false ? setError('Invalid passowrd') :
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
                        <input type="text" className='username email' placeholder='username' onBlur={PlaceBlur} onFocus={PlacFoucs} onChange={e => setUserName(e.target.value)} />
                        <input type="email" className='email' placeholder='email' onBlur={PlaceBlur} onFocus={PlacFoucs} onChange={e => setEmail(e.target.value)} />
                        <input type="password" className='password' placeholder='password' onBlur={PlaceBlur} onFocus={PlacFoucs} onChange={e => setPassword(e.target.value)} />
                        <input type="password" className='confirm password' placeholder='confirm password' onBlur={PlaceBlur} onFocus={PlacFoucs} onChange={e => setConfirmPassword(e.target.value)} />
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