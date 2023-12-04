'use client';
import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import { useStateContext } from "../../components/StateContext";
import NotAllowed from "../../components/NotAllowed";
import './Users.css';


const Users = () =>
{
    const { user } = useStateContext();
    const [users, setUsers] = useState([]);
    useEffect(() =>
    {
        user == 'admin' ?
            axios.get(`${process.env.SERVER}/users`)
                .then(res => setUsers(res.data))
                .catch(err => console.log(err)) : null;
    }, []);
    return (
        <>
            {user == 'admin' ? <>
                <Nav />
                <div className="users-page">
                    <h1>Users</h1>
                    <div className="-all-users">
                        {users.map(user =>
                        {
                            if (user.role == 'user')
                            {
                                return <div key={user._id} className="user">
                                    <p className="user-name">{user.username}</p>
                                    <p className="user-email">{user.email}</p>
                                </div>;
                            }

                        })}

                    </div>
                </div></> : <NotAllowed />}

        </>

    );
};

export default Users;