'use client';
import React, { use, useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import axios from "axios";


const Admins = () =>
{
    const [users, setUsers] = useState([]);
    useEffect(() =>
    {
        axios.get('http://localhost:3001/users')
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);
    return (
        <>
            <AdminNav />
            <div className="users-page">
                <h1>Users</h1>
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
            </div>
        </>
    );
};

export default Admins;