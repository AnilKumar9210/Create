import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRouter from './routes/userAuth.js';
import passwordRouter from './routes/passwordRoutes.js'
dotenv.config ();
const app = express ();
app.use(express.json());

app.use (cors());
app.use (bodyParser.json());
app.use ('/api/auth',authRouter);
app.use ('/api/passwords',passwordRouter);
app.use (express.json ())

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

mongoose.connect (process.env.MONGO_URI)
.then (()=> console.log('mongodb connected'))
.catch ((error)=> console.log (error));



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));
