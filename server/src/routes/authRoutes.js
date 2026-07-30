const express = require('express');

const router = express.Router();

//Import Controller here
const { registerUser, loginUser } = require('../controllers/authControllers');

//Use the controller here
router.post('/register', registerUser); //this means, if a POST request comes to /register, call the registerUser function.
router.post('/login', loginUser);   //this means, if a POST request comes to /login, call the loginUser function.

module.exports = router; 