import express from 'express'
import mongoose from 'mongoose';
// import bodyParser from 'express'
import userRouter from './Routes/user.js'
import adminRouter from './Routes/admin.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import paymentRouter from './Routes/payment.js'
import cors from 'cors';
import dotenv from 'dotenv'; // Import dotenv


// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(express.json()); // Use express's built-in JSON parser


app.use(cors({
  origin:true,
  methods:[ "GET","POST","PUT","DELETE"],
  credentials:true
}))

// home testing route
app.get('/',(req,res)=>res.json({messge:'This is home route'}))

// user Router
app.use('/api/user',userRouter)


// user Router
app.use('/api/admin',adminRouter)

// product Router
app.use('/api/product',productRouter)

// cart Router
app.use('/api/cart',cartRouter)

// address Router
app.use('/api/address',addressRouter)

// payment Router
app.use('/api/payment',paymentRouter)

// Connect to MongoDB using environment variables
mongoose.connect(process.env.MONGODB_URL, {
  dbName: process.env.DB_NAME
  }
).then(()=>console.log("MongoDB Connected Succssfully...!")).catch((err)=>console.log(err));

const port = process.env.PORT || 1000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))