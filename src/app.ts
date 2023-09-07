import "express-async-errors";
import express, { Application, json } from "express";
import "dotenv/config";
import developerRouter from "./routers/developer.router";
import projectRouter from "./routers/projects.router";
import middlewares from "./middlewares";


const app: Application = express();
app.use(json())

app.use("/developers", developerRouter)
app.use("/projects", projectRouter)

app.use(middlewares.handleError)




export default app;
