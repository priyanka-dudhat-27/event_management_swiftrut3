import express from "express";
import isAuth from "../middlewares/authMiddlware.js"
import { createEvent,editEvent,deleteEvent,getEvents,getMyEvents, likeEvent,addComment,deleteComment} from "../controllers/eventController.js";

const routes=express.Router();

routes.get("/getEvents",isAuth,getEvents)
routes.get("/getMyEvents/:id",isAuth,getMyEvents)

routes.post("/createEvent",isAuth,createEvent)
routes.patch("/editEvent",isAuth,editEvent)
routes.patch("/deleteEvent/:id",isAuth,deleteEvent)

routes.get("/like/:id",isAuth,likeEvent)
routes.post("/addComment/:id",isAuth,addComment)
routes.delete("/deleteComment",isAuth,deleteComment)

export default routes;