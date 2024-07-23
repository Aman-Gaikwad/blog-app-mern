import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
    console.log("mongo connected");
})
.catch((err)=>[
    console.log(err)
]);

app.listen(3000,()=>{console.log("server is listening at port ");})