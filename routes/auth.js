const router = require('express').Router();

const User = require('../models/user.model');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

//Register
router.post('/signup', async (req, res) => {
    
    // Check if user already exists
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists!');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);



    // Creating a new user
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    
    try { 
        const savedUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
    
});

//Login
router.post('/signin', async (req, res) => {

    // Check if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("Email or password is wrong");

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send("Email or password is wrong");
    
    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token);
    //res.send(token);
});

module.exports = router;