//Main express application

const cors = require('cors');

const express = require('express');    //imports express modules installed using npm

const path = require('path');

const authRoutes = require('./routes/authRoutes');

const jobRoutes = require('./routes/jobRoutes');

const app = express();  //main express application instance

app.use(cors());

app.use(express.json()); //It is a middleware because express can read json automatically, without it req.body will be undefined

console.log(path.join(__dirname, 'uploads'));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/api/auth', authRoutes);

app.use('/api/jobs', jobRoutes);

module.exports = app;


