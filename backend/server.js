const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./models/userSchema');
const checkAuthToken = require('./middleware/checkAuthToken');
dotenv.config();

const app = express();
const port = 5000;

//connect mongodb
const dbURI = process.env.DATABASE_URL

if (!dbURI) {
    console.log("DATABASE_URL is not defined in the environment variables.");
}

mongoose
.connect(dbURI)
.then(() => {
    app.listen(port, () => {
        console.log('Server connected to port 5000 and MongoDb')
    })
})
.catch((error) => {
    console.log('Unable to connect to Server and/or MongoDB', error)
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json()); // To parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded request bodies

// ------------CORS-------------------
app.use(cors({
    origin: "https://lifelink-nine.vercel.app", 
    credentials: true
}));

app.post('/test', (req, res) => {
    res.status(201).json({ message: "auth api testing done" });
});

app.post('/register',async (req,res)=>{
    try {
        const { email, name, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const newUser = new User({ email, name, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ ok: true, message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ ok: false, message: "Error creating user" });
    }
})

app.post('/login',async (req,res)=>{
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User is not logged in' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }
        
        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ userId: user._id }, process.env.JWT_REFRESH_SECRET_KEY, { expiresIn: '60m' });

        // Set HTTP-only cookies
        res.cookie('authToken', authToken, { httpOnly: true });
        res.cookie('refreshToken', refreshToken, { httpOnly: true });

        res.send({ ok: true, message: 'Login successful', authToken, refreshToken });
    } catch (error) {
        res.status(500).json({ ok: false, error: 'Error logging in' });
    }
})

app.get('/checklogin', checkAuthToken, async (req, res) => {
    res.json({
        userId: req.userId,
        ok: true,
        message: 'User authenticated successfully'
    });
});
