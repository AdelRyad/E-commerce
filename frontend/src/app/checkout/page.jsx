'use client';
import Image from 'next/image';
import './CheckOut.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useStateContext } from '../../components/StateContext';
const Checkout = () =>
{
    const { setCartPorduct, setShowCart } = useStateContext();
    const [OrderItems, setOrderItems] = useState([]);
    const [total, setTotal] = useState(0);
    const getTotal = () =>
    {
        let total = 0;
        OrderItems.map(pro =>
        {
            total += +pro.price * +pro.qty;
        });
        setTotal(total);

    };
    useEffect(() =>
    {
        if (sessionStorage.getItem('products'))
        {
            setOrderItems(JSON.parse(sessionStorage.products));
        }
        else
        {
            location.pathname = '/';
        }

    }, []);
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [adress, setAdress] = useState('');
    const [phone, setPhone] = useState('');
    const [feedback, setFeedback] = useState('');
    const [order, setOrder] = useState(false);

    total == 0 && OrderItems.length !== 0 ? getTotal() : null;

    const phoneValidation = /^0\d{10,}$/g;
    const emailValdiation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,6}$/g;
    const nameValdiation = /^[a-z]+\s?([a-z]+)?/ig;

    const handleCheckout = () =>
    {
        if (nameValdiation.test(name.trim()) && emailValdiation.test(email.trim()) && adress.trim() != '' && phoneValidation.test(phone.trim()))
        {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER}/checkout`, { "name": name, "email": email, "adress": adress, "phone": phone, 'feedback': feedback, 'products': OrderItems, 'total': total })
                .then(result =>
                {
                    result.data !== 'ordered' ? setOrder(false) : setOrder(true);
                })
                .catch(err => console.log(err));
        }
        else
        {
            name.trim() == '' ? setError("Invalid name") :
                email.trim() == '' ? setError("Invalid email") :
                    nameValdiation.test(name.trim()) == "false" ? setError("Invalid name") :
                        emailValdiation.test(email.trim()) == "false" ? setError('Invalid the email') :
                            adress.trim() == '' ? setError('enter the adress') :
                                phoneValidation.test(phone.toString()) == false ? setError('Invalid phone number') :
                                    setError('');
        }
        ;
    };

    return (
        <>
            {order == false ? null : <div className="lay-out">
                <div className="pop-up">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" /></svg>
                    <h1>Order Completed !</h1>
                    <Link className='check-btn' href={'/'} onClick={() =>
                    {
                        sessionStorage.clear();
                        setCartPorduct([]);
                        setShowCart(false);
                    }}>Continue Shopping</Link>

                </div>
            </div>
            }

            <h1 className='checkout-title'>CheckOut</h1>
            <div className='checkout'>
                <div className="bought-products" >
                    {OrderItems.length > 0 ? OrderItems.map(product =>
                        <div className="checkout-product" key={product._id}>
                            <Image key={product._id} src={product.image} width={100} height={100} alt={product.title} />
                            <p>{product.title}</p>
                            <p>{product.qty}</p>
                            <p>{product.price}$</p>
                        </div>
                    ) : null}
                    <p className='check-total'>Total: {total}$</p>
                </div>
                <div className="checkout-info">
                    <input type="text" placeholder='name' onChange={(e) => { setName(e.target.value); }} />
                    <input type="text" placeholder='email' onChange={(e) => { setEmail(e.target.value); }} />
                    <input type="text" placeholder='adress' onChange={(e) => { setAdress(e.target.value); }} />
                    <input type="text" placeholder='phone' onChange={(e) => { setPhone(e.target.value); }} />
                    <textarea placeholder='Give Us Feeback' onChange={(e) => { setFeedback(e.target.value); }} />
                    {error && <p className='error'>{error}</p>}
                    <button onClick={handleCheckout}>Order</button>
                </div>
            </div ></>
    );
};

export default Checkout;