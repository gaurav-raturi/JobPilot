//This file start the express server

const dotenv = require('dotenv');   //imports the dotenv package from node_modules

dotenv.config();   //Reads the .env file and loads all its variables into process.env

const app = require('./app');

const connectDB = require('./config/db');

connectDB();   //it calls the function  inside db.js

const PORT = process.env.PORT || 5000;   //uses the environment port or 5000

app.get('/', (req, res) => {
    res.send('Job Pilot backend running successfully');
});

app.listen(PORT, () => {                                // Starts the server
    console.log(`Server is running on port ${PORT}`);
});