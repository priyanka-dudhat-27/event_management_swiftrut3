import Event from "../models/eventModel.js"
import { extractPublicId, deleteImageByUrl } from "../public/cloudinary.js";

const createEvent=async(req,res)=>{
    const { title,
        image,
        eventStartDate,
        eventEndDate,
        location,
        eventType,
        attendees,} =req.body;

    try {
        if (
            !title ||
            !image ||
            !eventStartDate ||
            !eventEndDate ||
            !location ||
            !eventType ||
            !attendees
          ) {
            return res.status(422).json({ message: "Fill all the inputs" });
          }

          const user=req.user._id

          const response=await Event.create(req.body)
          if(response){
            return res.status(201).json({ message: "Event Created Successfully" });
          }else{
            return res.status(422).json({ message: response.message });
          }

    } catch (error) {
        if (image_Id) await deleteImageByUrl(`events/${image_Id}`, res);

        return res.status(500).json({ message: error.message });
    }
}


const editEvent = async (req, res) => {
    const {
      eventId,
      title,
      image,
      eventStartDate,
      eventEndDate,
      location,
      eventType,
      attendees,
    } = req.body;
  
    const image_Id = extractPublicId(image);
    const user = req.user._id;
  
    try {
      // Validate that all fields are present
      if (
        !eventId ||
        !title ||
        !image ||
        !eventStartDate ||
        !eventEndDate ||
        !location ||
        !eventType ||
        !attendees
      ) {
        return res.status(422).json({ message: "Fill all the inputs" });
      }
  
      // Create the post with the additional event-related fields
      const response = await postModel.findByIdAndUpdate(eventId, {
        title,
        image,
        user,
        image_Id,
        eventStartDate,
        eventEndDate,
        location,
        eventType,
        attendees,
      });
  
      if (response) {
        return res.status(201).json({ message: "Event Edited Successfully" });
      } else {
        return res.status(422).json({ message: response.message });
      }
    } catch (error) {
      if (image_Id) await deleteImageByUrl(`posts/${image_Id}`, res);
      return res.status(500).json({ message: error.message });
    }
  };
  
  const deleteEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postModel.findById(id).populate("user", "_id");
  
      if (!post) return res.status(404).json({ message: "Event not found" });
      const publicId = post.image_Id;
  
      if (req.user._id.toString() != post.user._id.toString())
        return res.status(404).json({ message: "User Not Authorized" });
  
      // Delete post and image
      await postModel.findByIdAndDelete(id);
      await deleteImageByUrl(`posts/${publicId}`, res);
  
      return res.status(200).json({ message: "Event and image deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  
const getEvents = async (req, res) => {
    try {
      const posts = await postModel
        .find({})
        .populate("user", "username image")
        .populate("comments.user", "username");
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const getMyEvents = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postModel
        .findById(id)
        .populate("user", "username image")
        .populate("comments.user", "username");
  
      return res.json(post);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  const likeEvent = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postModel.findOne({ _id: req.params.id });
  
      if (post.likes.indexOf(req.user._id) === -1) {
        post.likes.push(req.user._id);
        await post.save();
        return res.status(200).json({ Like: true, message: "Liked" });
      } else {
        post.likes.splice(post.likes.indexOf(req.user._id), 1);
        await post.save();
        return res.status(200).json({ Like: false, message: "Unlike" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const addComment = async (req, res) => {
    try {
      const { id } = req.params;
      const post = await postModel.findById(id);
      post.comments.push({ user: req.user._id, comment: req.body.comment });
      await post.save();
  
      return res.status(200).json({ message: "Comment Done" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const deleteComment = async (req, res) => {
    try {
      const { commentId, postId } = req.query;
      const post = await postModel.findById(postId);
  
      if (!post) return res.status(404).json({ message: "Event not found" });
  
      // Filter
      post.comments = post.comments.filter((comment) => comment._id.toString() !== commentId);
      await post.save();
  
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

export {createEvent,editEvent,deleteEvent,likeEvent,deleteComment,addComment,getEvents,getMyEvents }