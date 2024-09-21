import express from "express";
import authRouter from "./authRoutes.js";

const routes = express.Router();

routes.use("/", authRouter);

export default routes;
