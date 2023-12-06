'use client';
import { useEffect, useState } from 'react';
import './Orders.css';
import { useStateContext } from '../../components/StateContext';
import Nav from '@/components/Nav';
import NotAllowed from '../../components/NotAllowed';
import axios from 'axios';
import Orders from './Orders';
const OrdersPage = () =>
{

    const { user } = useStateContext();
    const [orders, SetOrders] = useState([]);

    useEffect(() =>
    {
        axios.get(`${process.env.NEXT_PUBLIC_SERVER}/orders`)
            .then(res => SetOrders(res.data));
    }, []);
    return (
        <>
            {user == 'admin' ?
                <>
                    <Nav />
                    <div className="orders-page">
                        <h1>Orders</h1>
                        <div className="orders">
                            {orders.map(order => <Orders order={order} key={order.name} />

                            )}
                        </div>

                    </div></> : <NotAllowed />
            }
        </>

    );
};

export default OrdersPage;