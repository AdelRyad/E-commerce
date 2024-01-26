
'use client';
import Link from 'next/link';
import { useStateContext } from './StateContext';
import { useState } from 'react';
import Image from 'next/image';
import './styles/Nav.css';


const Nav = () =>
{

    const { showCart, setShowCart, cartProduct, products, user, setUser } = useStateContext();
    const [ searchActive, setSearchActive ] = useState( false );
    const [ searchItems, setSearchItems ] = useState( [] );
    const search = ( searchValue ) =>
    {
        const value = searchValue.trim().toLowerCase();
        if ( searchValue != '' )
        {
            setSearchActive( true );
            let arr = [];
            products.map( product =>
            {
                if ( product.title.trim().toLowerCase().startsWith( value ) )
                {
                    arr.push( product );
                    setSearchItems( arr );
                }
                else
                {
                    searchItems.map( ( item, index ) =>
                    {
                        if ( !( item.title.trim().toLowerCase().startsWith( value ) ) )
                        {
                            if ( searchItems.length === 1 )
                            {
                                setSearchItems( [] );
                            } else
                            {
                                searchItems.splice( index, 1 );
                            }
                        }
                    } );
                }
            } );
        }
        else
        {
            setSearchItems( [] );
        }
    };

    return (
        <>{
            user == 'admin' ?
                <div className="nav admin-nav">
                    <Link href={ '/' } className="logo">E-Commerce</Link>
                    <ul className="links">
                        <Link href={ "/admin" } className="link a-nav">Admin</Link>
                        <Link href={ '/all-products' } className="link">Products</Link>
                        <Link href={ '/add-product' } className="link">Add Product</Link>
                        <Link href={ '/orders' } className="link">Orders</Link>
                        <Link href={ '/users' } className="link">Users</Link>
                        <Link href={ '/admins' } className="link">Admins</Link>
                        <button name='log-out' className='log-out' onClick={ () =>
                        {
                            sessionStorage.removeItem( 'jwt' );
                            setUser( 'guest' );
                            location.pathname = '/';
                        } }>Log Out</button>
                    </ul>
                </div > :
                <div className="nav">
                    <Link href={ '/' } className="logo">E-Commerce</Link>
                    <ul className="links">
                        <div className='search-container'>
                            <input type='text' placeholder='Search' className="search" onBlur={ () => setTimeout( () => setSearchActive( false ), 75 ) } onChange={ ( e ) =>
                            {
                                search( e.target.value );
                            } } />
                            { searchActive == true ?
                                <div className="search-items">
                                    { searchItems.map( item =>
                                        <Link className='search-item' key={ item._id } id={ item._id } href={ item._id }>
                                            <Image src={ item.image } width={ 1000 } height={ 1000 } alt='' id={ item._id } quality={ 100 } />
                                            <p id={ item._id }>{ item.title }</p>
                                        </Link>
                                    ) }
                                </div>
                                : null }
                        </div>
                        <li className="link" onClick={ () =>
                        {
                            showCart == false ? setShowCart( true ) : setShowCart( false );
                            document.body.style.position = 'fixed';
                            document.body.style.width = '100%';
                        } }>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" /></svg>{ cartProduct.length }</li>
                    </ul>
                    { user !== 'user' ? <div className="sign">
                        <Link href={ '/sign-up' } className='sign-up'>Sign Up</Link>
                        <Link href={ '/log-in' } className="log-in">Log In</Link>
                    </div> : <button name='log-out' className='log-out' onClick={ () =>
                    {
                        sessionStorage.removeItem( 'jwt' );
                        setUser( 'guest' );
                        location.pathname = '/';
                    } }>Log Out</button>
                    }

                </div>
        }



        </>
    );
};





export default Nav;