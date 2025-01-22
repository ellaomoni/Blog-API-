require('dotenv').config();
const express= require('express');
const app = express();
const  errorHandler = require('./middlewares/errorHandler')


const connectDB = require('./config/db');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(errorHandler);


const userRoutes = require('./routes/userRoutes');

app.use("/api/v1/users", userRoutes);

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











