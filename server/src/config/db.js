const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);

        console.log('MongoDB Connected Successfully');
        
    }
    catch(error) {
        console.log('Database Connection Error:', error.message);
        process.exit(1);      //Stop the application because database connection failed.
    }
};

module.exports = connectDB;