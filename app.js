require('dotenv').config();
const express= require('express');
const app = express();


const connectDB = require('./config/db');

app.get('/' , (req,res) => {
    res.send('Server is connected');
});

const PORT = process.env.PORT || 8000;

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URI);
        console.log('connected to databae successfully');
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    } catch( error){
        console.error(error);
        
    }
};
start();











