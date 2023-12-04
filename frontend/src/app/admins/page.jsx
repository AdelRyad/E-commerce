'use client';
import React, { use, useEffect, useState } from "react";
import axios from "axios";
import Nav from "../../components/Nav";
import { useStateContext } from "../../components/StateContext";
import NotAllowed from "../../components/NotAllowed";
import '../users/Users.css';


const Admins = () =>
{
    const [users, setUsers] = useState([]);
    const { user } = useStateContext();

    useEffect(() =>
    {
        axios.get('http://localhost:3001/admins')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            {user == 'admin' ? <><Nav />
                <div className="users-page">
                    <h1>Admins</h1>
                    <div className="-all-users">
                        {users.map(user =>
                        {
                            if (user.role == 'admin')
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

export default Admins;