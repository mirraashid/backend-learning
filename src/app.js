import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

function startServer() {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on PORT: ${process.env.PORT}`);
    });

    app.on("error", (error) => {
        console.error("Error: ", error);
        throw error;
    });

    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    }))

    app.use(express.json({
        limit: "16kb"
    }))

    //to get nested params.
    app.use(express.urlencoded({
        extended: true,
        limit: "16kb"
    }))

    //to allow save pulic resources - PDF's, Images
    app.use(express.static("public"));

    //to perform CRUD on cookies
    app.use(cookieParser());
}

export default startServer;