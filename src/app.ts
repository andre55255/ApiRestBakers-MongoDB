import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import "./database/connection";

import routerAccount from "./routes/accountRouter";
import routerUser from "./routes/userRouter";
import routerStatic from "./routes/staticRoutes";

export class App {
    public server: express.Application;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.docs();
    }

    private middlewares() {
        dotenv.config();
        this.server.use(
            cors({
                origin: ["http://localhost:3000"],
            })
        );
        this.server.use(express.json());
    }

    private routes() {
        this.server.use(routerAccount);
        this.server.use(routerUser);
        this.server.use(routerStatic);
    }

    private docs() {
        this.server.use(
            "/swagger",
            swaggerUi.serve,
            swaggerUi.setup(swaggerDocs)
        );
    }
}
