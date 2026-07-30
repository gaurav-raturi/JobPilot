const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {

    try {

    const { name, email, password} = req.body;   //Read data from the request
    
    //Check if email already exists
    const existingUser = await User.findOne({ email });

    if(existingUser) {
        return res.status(400).json({
            success : false,
            message : 'Email already exists'
        });
    }

    //Hash password and converting it into random string
    const hashedPassword = await bcrypt.hash(password, 10);  

    //Create user
    const user = await User.create({
        name,
        email,
        password :hashedPassword 
    });    

    //Save user
    await user.save();

    res.status(201).json({              //this is the response send by the server
        success : true,
        message : 'User registered Successfully'
    });    
}

catch(error) {

    console.log(error);
    
    res.status(500).json({
        success : false,
        message : 'Internal Server Error'
    });
  }
};

const loginUser = async (req, res) => {

    console.log('Login route hit');

    try{

        const { email, password } = req.body;

        //Check if user exists
        const existingUser = await User.findOne({ email });

        if(!existingUser) {
            return res.status(401).json({
                success : false,
                message : 'Invalid email or password'
            });
        }

        //Compare password
        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if(!isMatch) {
            return res.status(401).json({
                success : false,
                message : 'Invalid email or password'
            });
        }

        //Create JWT Token
        const token = jwt.sign(
            {
                id : existingUser._id,
                role : existingUser.role
            },
            process.env.JWT_SECRET
        );

        //Send response
        res.status(200).json({
            success : true,
            message : 'Login Successfull',
            token,
            user : {
                name : existingUser.name,
                email : existingUser.email
            }
        });
    }
    
    catch(error) {
        
        console.log(error);

        res.status(401).json({
            success : false,
            message : 'Internal server Error'
        });
    }
};

module.exports = { registerUser, loginUser };  //we export object