import type { Request, Response, NextFunction } from "express";
import Logger from './logger.model.js'



const requestMiddlware = async(req: Request, res: Response, next: NextFunction)=>{
    const {method, url, ip} = req;
    const timeStamp = new Date().toISOString();
    console.log(`Method: ${method} , url: ${url}, timeStamp: ${timeStamp}`);

    try {
        await Logger.create({
           ip,
           method,
           route: url,
           timeStamp
        });

    } catch (error) {
        console.log('Getting error while saving logs to db')
    }
    next();
};

export default requestMiddlware;

