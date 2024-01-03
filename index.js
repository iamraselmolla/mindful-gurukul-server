// server.js
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors")
const User = require('./model/User');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors())

mongoose.connect('mongodb+srv://rasel:rasel@cluster0.q37bxqk.mongodb.net/mindful-gurukul', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to the database!');
});

// Register
app.post('/register', async (req, res) => {
    try {

        const newUser = new User(req.body);
        const findUser = await User.findOne({ email: req.body.email })
        if (findUser) {
            return res.status(409).json({ message: 'User already registered', statusCode: 409 });
        }

        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User Created Successfully', statusCode: 201 });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const findUser = await User.findOne({ email })
        if (!findUser) {
            return res.status(400).json({ message: 'User not found. Please register first' })
        }
        res.status(200).json({ message: 'Login Successfull', data: { id: findUser?._id, login: true, name: findUser?.name } })
    }
    catch (err) {
        console.log(err)
    }
})
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
