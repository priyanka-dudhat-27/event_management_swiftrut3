import express from "express";
import {isAuth} from "../middlewares/authMiddlware.js"

const routes = express.Router();

routes.post("/profilePic",isAuth,profilePic)
routes.post("/removeProfilePic",isAuth,removeProfilePic)

routes.get("/getUser",isAuth,getUser)
routes.get("/logout",isAuth,logout)

export default routes;
