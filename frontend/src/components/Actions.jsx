
import axios from "axios";

// handle quantity of cart products


// protecting rouets
export const checkUser = async (token) =>
{
    const token = sessionStorage.getItem('jwt');
    const fetch = await axios.post('http://localhost:3001/check-user', { 'token': token });
    const user = fetch.json();
    return user;
};

// delet product from store 
export const deleteProduct = (Id) =>
{
    axios.delete(`http://localhost:3001/delete/${Id}`)
        .then(res => res.data == 'deleted' ? getProducts() : null)
        .catch(err => console.log(err));
};

// fetching data
export const getProducts = async () =>
{
    const fetch = await axios.get('http://localhost:3001/products');
    const data = fetch.json();
    return data;
};

// get orders
export const getOrders = async () =>
{
    const fetch = await axios.get('http://localhost:3001/orders');
    const orders = fetch.json();
    return orders;

};

export const getAdmins = async () =>
{
    const fetch = await axios.get('http://localhost:3001/admins');
    const admins = fetch.res;
    return admins;
};