import express from 'express';
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoutes.js';
import communityRouter from './routes/communityRoute.js';

//App config

const app = express()
const port =process.env.PORT || 5000
connectDB()
connectCloudinary()
// middleware  
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
app.use(cors())

//api endpoints
app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/api/community',communityRouter)

app.get('/',(req,res)=>
    {res.send("api working")}
)
app.listen(port,()=>console.log('server started on port : '+ port))
