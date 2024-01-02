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
        const savedUser = await newUser.save();
        res.status(201).json({ message: 'User Created Successfully', statusCode: 201 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
