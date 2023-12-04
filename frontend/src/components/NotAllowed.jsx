import Link from 'next/link';
import React from 'react';
import './styles/NotAllowed.css';

const NotAllowed = () =>
{
    return (
        <div className='not-allowed'>
            <h1>You are not allowed !</h1>
            <Link href={'/'}>Back To Home Page</Link>
        </div>
    );
};

export default NotAllowed;