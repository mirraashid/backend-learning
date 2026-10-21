import express from 'express';
import  mongoose from "mongoose"
import { DB_NAME } from "./constants.js";
import connectDB from './db/index.js';

const app = express();


connectDB();


/*
//Basic and simple approach is to use IFFIE function and use async/await and try/catch
(async () => {
    try {
       await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        app.on("error", (error) => {
            console.error("Error: ", error);
            throw error;
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        });
    } catch (error) {
        console.error('ERROR: ', error);
        throw error
    }
})()

*/