import express from "express";
import isAuth from "../middlewares/authMiddlware.js";
import cloudinary from "../utils/cloudinary.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary"; // Import CloudinaryStorage

import {
  createEvent,
  editEvent,
  deleteEvent,
  getEvents,
  getMyEvents,
  likeEvent,
  addComment,
  deleteComment,
  getEventById,
} from "../controllers/eventController.js";

const routes = express.Router();

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "events",
    allowedFormats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage: storage });

routes.get("/getEvents", getEvents);
routes.get("/:id", getEventById);
routes.get("/getMyEvents/:id", isAuth, getMyEvents);
routes.post("/createEvent", upload.single("image"), isAuth, createEvent);
routes.put("/editEvent/:eventId", isAuth, editEvent);
routes.get("/getEventById/:id", isAuth, getEventById);
routes.delete("/deleteEvent/:id", isAuth, deleteEvent);
routes.get("/like/:id", isAuth, likeEvent);
routes.post("/addComment/:id", isAuth, addComment);
routes.delete("/deleteComment", isAuth, deleteComment);

export default routes;
