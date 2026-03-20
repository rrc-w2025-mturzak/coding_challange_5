import express, {Express} from "express";

import dotenv from "dotenv";
dotenv.config();

import resourceRouter from "./api/v1/routes/resourceRoutes";
import morgan from "morgan";
import {
    accessLogger,
    errorLogger,
    consoleLogger,
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorhandler";
import adminRouter from "./api/v1/routes/admin";
import setupSwagger from "./api/v1/config/swagger";
import { getHelmetConfig } from "./api/v1/config/helmetConfig";

const app: Express = express();

const getCorsOptions = () => {
   
        // Allow all origins in development for easy testing
        return {
            origin: true,
            credentials: true,
        };
     
};

app.use(getHelmetConfig());
app.use(getCorsOptions);

// Logging middleware (should be applied early in the middleware stack)
if (process.env.NODE_ENV === "production") {
    // In production, log to files
    app.use(accessLogger);
    app.use(errorLogger);
} else {
    // In development, log to console for immediate feedback
    app.use(consoleLogger);
}

app.use(express.json());
app.use(morgan("combined"));
app.use("/api/v1/", resourceRouter);
app.use("/api/v1/", adminRouter);

setupSwagger(app);
// Global error handling middleware (MUST be applied last)
app.use(errorHandler);

export default app;
