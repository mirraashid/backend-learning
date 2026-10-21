import connectDB from './db/index.js';
import startServer from './app.js';


connectDB()
.then(() => {
    startServer();
})
.catch((err) => {
    console.error("Mongo db connection failed !!! ", err)
})


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