const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UsereModel = require('./models/User');
const productModel = require('./models/Product');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const orderModel = require('./models/Order');

require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

// create token
const createToken = (id) =>
{
    return jwt.sign({ id }, 'e-commerce web template');
};
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Vercel!' });
});
// create new user

app.post('/new-user', async (req, res) =>
{
    UsereModel.findOne({ email: req.body.email })
        .then(async user =>
        {
            if (!user)
            {

                const User = new UsereModel({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    role: req.body.role,
                });
                const token = createToken(User._id);
                User.token = token;

                if (User.password);
                {
                    await User.save();
                    res.json('created');
                }
            } else
            {
                res.json('this user is already exist');
            }

        });

});
// add product
app.post('/new-product', async (req, res) =>
{
    const product = new productModel({
        tittle: req.body.tittle.trim(),
        category: req.body.category.trim(),
        desc: req.body.desc.trim(),
        price: req.body.price
    });
    await product.save();
    res.json('created');
});

// log in 
app.post("/user", async (req, res) =>
{
    const { email, password } = req.body;
    UsereModel.findOne({ email: email })
        .then(user =>
        {
            if (user)
            {
                bcrypt.compare(password, user.password, (err, result) =>
                {
                    if (err)
                    {
                        res.json("password is'nt correct");
                    }
                    if (result)
                    {
                        if (user.role == 'admin')
                        {
                            res.json(['admin', user.token]);
                        }
                        else
                        {
                            res.json(['user', user.token]);
                        }

                    }
                });
            }

            else
            {
                res.json("no user found");
            }
        });

});

// get all products
app.get('/products', async (req, res) =>
{
    try
    {
        productModel.find()
            .then(product =>
            {
                res.json(product);
            });
    } catch (error)
    {
        console.log(error);
    }


});

// delete product
app.delete('/delete/:id', async (req, res) =>
{

    productModel.findByIdAndDelete(req.params.id)
        .then(res.json('deleted'))
        .catch(err => console.log(err));


});
// edit product

app.get('/edit/:id', async (req, res) =>
{
    try
    {
        productModel.findById(req.params.id)
            .then(product => res.json(product));
    } catch (error)
    {
        console.log(error);
    }
});
// update product
app.put('/edit/:id', async (req, res) =>
{
    try
    {
        productModel.findByIdAndUpdate(req.params.id, {
            title: req.body.tittle.trim(),
            category: req.body.category.trim(),
            description: req.body.desc.trim(),
            price: req.body.price
        })
            .then(res.json('edited'));

    } catch (error)
    {
        console.log(error);
    }

});

// product page
app.get('/product/:id', async (req, res) =>
{
    try
    {
        productModel.findById(req.params.id)
            .then(product => res.json(product));
    }
    catch (err)
    {
        console.log(err);
    }
});

// users page

app.get('/users', async (req, res) =>
{
    UsereModel.find({ role: 'user' })
        .then(users => res.json(users))
        .catch(err => console.log(err));

});
// admins page
app.get('/admins', async (req, res) =>
{
    UsereModel.find({ role: 'admin' })
        .then(users => res.json(users))
        .catch(err => console.log(err));

});


// handle check out
app.post('/checkout', async (req, res) =>
{
    const Order = new orderModel({
        name: req.body.name,
        email: req.body.email,
        adress: req.body.adress,
        phone: req.body.phone,
        feedback: req.body.feedback,
        products: req.body.products,
        total:req.body.total
    });
    await Order.save();
    res.json('ordered');
});

// protecting routes
app.post('/check-user', (req, res) =>
{

    UsereModel.findOne({ token: req.body.token })
        .then(user =>
        {
            if (user)
            {
                res.json(user.role);
            } else
            {
                res.json('not user');
            }
        });
});

// orders page 
app.get('/orders', (req, res) =>
{
    orderModel.find().then(Orders => res.json(Orders))
})



mongoose.connect(process.env.DATA_BASE);
app.listen(process.env.PORT, () =>
{
    console.log('server is running');
});
