const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config()
const app = express()


mongoose.connect(process.env.MONGO_URL)
 .then(() => console.log("Mongodb connected"))
 .catch((err) => console.log("Connection failed", err))

app.listen(process.env.PORT, () => {
    console.log(`server is running port ${process.env.PORT}`)
})

app.get('/', (req, res) => {
    res.send("subscribe-")
})