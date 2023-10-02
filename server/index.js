const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UsereModel = require('./models/User');
const productModel = require('./models/Product');
const { redirect } = require('next/dist/server/api-utils');
const app = express();
app.use(express.json());
app.use(cors());



app.post('/new-user', async (req, res) =>
{
    const User = new UsereModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    });
    await User.save();
    res.json('created');
});

app.post('/new-product', async (req, res) =>
{
    const product = new productModel({
        tittle: req.body.tittle.trim(),
        category: req.body.category.trim(),
        desc: req.body.desc.trim(),
        amount: req.body.amount,
        price: req.body.price
    });
    await product.save();
    res.json('created');
});

app.post("/user", async (req, res) =>
{
    const { email, password } = req.body;
    UsereModel.findOne({ email: email})
        .then(user =>
        {
            if (user)
            {
                if (user.password === password)
                {
                    if (user.role == 'admin')
                    {
                        res.json('admin');
                    }
                    else
                    {
                        res.json('user');
                    }
                }
                else
                {
                    res.json("password is'nt correct");
                }
            } else
            {
                res.json("no user found");
            }
        });

});

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

app.delete('/delete/:id', async (req, res) =>
{

    productModel.findByIdAndDelete(req.params.id)
        .then(res.json('deleted'))
        .catch(err => console.log(err));


});

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

app.put('/edit/:id', async (req, res) =>
{
    try
    {
        productModel.findByIdAndUpdate(req.params.id,{
        tittle: req.body.tittle.trim(),
        category: req.body.category.trim(),
        desc: req.body.desc.trim(),
        amount: req.body.amount,
        price: req.body.price
    })
            .then(res.json('edited'))
        
    } catch (error)
    {
        console.log(error);
    }

});

app.get('/product/:id', async (req, res) =>
{
    try
    {
        productModel.findById(req.params.id)
        .then(product => res.json(product))
    }
    catch (err)
    {
        console.log(err)
    }
})

app.get('/users', async (req, res) =>{
    UsereModel.find()
        .then(users => res.json(users))
    .catch(err => console.log(err))

})





mongoose.connect('mongodb://127.0.0.1:27017/e-commerce');
app.listen(3001, () =>
{
    console.log('server is running');
});