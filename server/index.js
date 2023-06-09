import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './connection/connect.js'
import postRoutes from './routes/postRoutes.js'
import dalleRoutes from './routes/dalleRoutes.js'
import  userRoutes from './routes/userRoutes.js'

dotenv.config()

const app=express();
app.use(cors());
app.use(express.json({limit:'50mb'}));

//Api endpoints to use in frontend requests  
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/users', userRoutes);


app.get('/',async(req,res)=>{
  res.send("Hello From Danish")
})

const startServer=async()=>{

    try {
        connectDb(process.env.MONGODB_URL)
        app.listen(8080,()=>console.log("Starting server on port 8080"));

    } catch (error) {
        console.log(error)
    }
}

startServer();