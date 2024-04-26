import express, { Response, Request, NextFunction } from "express";
import { logRequestResponse } from "@lib/log";
import { errorHandler } from "@core";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
//https://app.diagrams.net/#G1tvL5CnkRjU4rHQpCH6hPuNPDN2mQ9n9r

app.use(express.json());

app.use(logRequestResponse);

app.get("/", (req: Request, res: Response) => {
    res.send({ message: "Welcome to notes-app", service: "notes-app" });
});

process.on("unhandledRejection", (error: Error) => {
    //as we know anything can be rejected so error above cannot be all the time instance of Error/ Exception
    errorHandler.handleError(error, "unhandledRejection");
});

process.on("uncaughtException", (error) => {
    errorHandler.handleError(error, "uncaughtException");
});

app.listen(PORT, () => {
    console.log(`Serving on http://localhost:${PORT}`);
    routes(app);
});
