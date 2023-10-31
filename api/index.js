dotenv.config()
import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log("Connected to MongoDb Successfully 🚀");
    })
    .catch((error) => {
        console.log(error);
    })
const app = express()
app.listen(3000, () => {
    console.log('server listening on port 3000!');
});

app.use(express.json());
app.use(cookieParser())
app.use('/api/user/',userRoutes)
app.use('/api/auth/' ,authRoutes)

app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    })
})