const express=require('express');
const app=express();
const db=require('./Models/db')
const body_parser=require('body-parser')
const cors=require('cors')
require('dotenv').config()
const AuthRoutes=require('./Routes/AuthRoutes')
const GoodsRouter=require('./Routes/Goods')
const PORT=process.env.PORT||3000;
app.use(body_parser.json());
app.use(cors())
app.use('/auth',AuthRoutes);
app.use('/products',GoodsRouter)
app.listen(PORT,()=>{
    console.log("Server is running")
})