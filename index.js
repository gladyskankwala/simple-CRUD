const express = require('express');
const mongoose = require('mongoose');
const Products = require('./utils/productModel.js')
const path = require('path');
require("dotenv").config()
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})


app.get( '/api/products' , async (req, res) => {
    try {
        const  products = await Products.find({});
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.put('/api/products/:id', async (req, res) => {
    try {
        const {id} = req.params;

        const product = await Products.findByIdAndUpdate(id, req.body, {new: true})

        if (!product) {
            res.status(404).json({message: "Product not found"})
        }
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}) 


app.post('/api/products', async (req, res) => {
    try {
        const product = await Products.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


mongoose.connect(process.env.MONGO_URL)
 .then(() => console.log("Mongodb connected"))
 .catch((err) => console.log("Connection failed", err))



app.listen(process.env.PORT, () => {
    console.log(`server is running port ${process.env.PORT}`)
})