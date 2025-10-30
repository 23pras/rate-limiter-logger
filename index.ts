const express = require('express');
const app = express();
const rateLimter = require('express-rate-limiter');
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import requestMiddlware from './loggerMiddleware.js'
import Logger from './logger.model.js'

dotenv.config();

app.use(express.json());

app.use((err: any,req: any,res: any,next: () => void)=>{
    console.log('Errors : ' ,err);
    next();
});

const connectToDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log('MongoDb Atlas connected !')
    } catch (error) {
        console.log('Db not connected >> ', error);
        process.exit(1)
    }
};

connectToDB();

const limit = new rateLimter({
    windowMs : 10*1000,
    limit: 5,
    message: '429 Too Many Requests.',
    standardHeader: true,
    legacyHeader: false
});

app.use(limit);

app.use(requestMiddlware);


app.get('/hello', (req: any,res: any)=>{
    res.status(200).send({
        status: true,
        message: "hello"
    })
});

app.get('/metrics', async(req : any,res: any)=>{
  
    const logs = await Logger.find();
    console.log(`All logs data from DB: `, logs);
    return ;

})

app.listen(3000, ()=>{
    console.log('Server running on PORT 3000');
})