import express from 'express';
import connectDB from './config/db';
const userRoutes = require('./routes/user')
const productRoutes = require('./routes/product')
const  pdfGenerate =require( './routes/pdf');
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config(); 

const app = express();

 connectDB();
app.use(cors());
app.use(express.json());
 app.use('/api/auth',userRoutes);
 app.use('/api/products', productRoutes);
 app.use('/api/auth', pdfGenerate);

const PORT = process.env.PORT || 5000;

app.get('/',(_,res)=>{
    res.send("<h1>hello your server is ready</h1>");
});
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
