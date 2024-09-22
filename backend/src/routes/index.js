import express from "express";
import authRouter from "./authRoutes.js";
import eventRouter from "./eventRoutes.js";

const routes = express.Router();

routes.use("/", authRouter);
routes.use("/event", eventRouter);

export default routes;
