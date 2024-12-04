import express from "express";
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import apiResponse from "./utils/apiResponse.js";

// intialising express
const app = express();

// setting up json, cookie parser and urlencoder with limits for security purposes
app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "16kb"}));
app.use(cookieParser());

//defining routes here

app.use("/api/v1/users", userRoute);


// Express's error handling middleware
app.use((err, _, res, __) => {
    console.log("ERORR MESSAGE IN MIDDLEWARE:", err);
    if (!err.statusCode) {
        err.statusCode = 500;
        err.message = "Interval Server Error";
    }
    res.status(err.statusCode).json(apiResponse(500, err.message));
});

export default app;