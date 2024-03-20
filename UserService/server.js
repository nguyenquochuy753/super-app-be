const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./Routes/User.route');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_CONNECTION).then(()=>{
    console.log('Connected MongoDB');
})

app.use('/users',userRouter);

app.listen(8000,()=>{
    console.log('Server is running on port 8000');
})