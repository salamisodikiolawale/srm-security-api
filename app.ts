//----Natif modules import
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Logger from './loggers/Logger';
import dotenv  from 'dotenv';
import router from './routers/index.router';
dotenv.config( {path : './.env'});


//-----Routers import

//----Env Variables
let NODE_ENV:string|undefined = process.env.NODE_ENV;
let FRONTEND:string|undefined = process.env.FRONTEND;
let DB_ENV:string|undefined = process.env.DB_ENV;


//----Created application express
const app:express.Application = express();



//----Cors config
const corsOptions ={
    origin:`*`, 
    credentials:true,//access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));  


app.use(express.json()); 


//----database connection
const connectToDb = async () => {
    
    if(DB_ENV) {

        mongoose.set('strictQuery', false);
        mongoose.connect(DB_ENV).then( () => {

            Logger.info('Connecting to mongoDB Successfully ...');
        })
        .catch( (error) => {
            
            Logger.error('Connecting to mongoDB ...', error);
            process.exit(1); 
        });
    } else {
        
        throw new Error("Env variable it not define");
    }
}

if(NODE_ENV){

    connectToDb();
}else{

    throw new Error("NODE_ENV is missing");
}


app.use(router);

export default app;



