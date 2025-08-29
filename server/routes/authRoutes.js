const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 

// @route   POST api/auth/register
// @desc    Register new user
// @access  Public

router.post('/register', async(req,res)=>{
    const{ username , email , password} = req.body;

    try
    {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({msg:'User already exist'});
        }
        // Create new user (password will be hashed by pre-save hook)
        user = new User({
            username,
            email,
            password
        });

        await user.save();

        // Generate JWT
        const payload = {
            user:{
                id:user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {expiresIn: '1h'},
            (err,token)=>{
                if(err) throw err;
                res.json({token});
                
            }
        );
    } catch(err){
        console.error(err.message);
        res.status(500).send('server Error')
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Compare password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        // Generate JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
module.exports = router;