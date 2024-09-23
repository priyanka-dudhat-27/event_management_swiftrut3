import Event from "../models/eventModel.js";
import { extractPublicId, deleteImageByUrl } from "../public/cloudinary.js";

const createEvent = async (req, res) => {
  const { title, image, eventStartDate, eventEndDate, location, eventType, attendees } = req.body;
  const userId = req.user.id;

  const newEvent = new Event({
    title,
    image,
    createdBy: userId, // Changed 'user' to 'createdBy'
    eventStartDate,
    eventEndDate,
    location,
    eventType,
    attendees,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    console.error('Error creating event:', error.message); // More detailed error logging
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

const editEvent = async (req, res) => {
  const { eventId } = req.params;
  const { title, image, eventStartDate, eventEndDate, location, eventType, attendees } = req.body;
  console.log("abcd",image,title)
  try {
      // Update event in the database
      const updatedEvent = await Event.findByIdAndUpdate(eventId, {
          title,
          image,
          eventStartDate,
          eventEndDate,
          location,
          eventType,
          attendees,
      }, { new: true });

      if (!updatedEvent) {
          return res.status(404).json({ message: 'Event not found' });
      }

      return res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};



const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedEvent = await Event.findByIdAndDelete(id);
      if (!deletedEvent) {
          return res.status(404).json({ message: 'Event not found' });
      }
      return res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find({})
      .populate("createdBy", "username image") // Changed from 'user' to 'createdBy'
      .populate("comments.user", "username");

    if (!events.length) {
      return res.status(404).json({ message: "No events found" });
    }

    return res.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error.message);
    return res.status(500).json({ message: error.message });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;

  try {
      // Fetch the event by ID and populate related fields
      const event = await Event.findById(id)
          .populate('createdBy', 'username image') // Ensure this matches your schema
          .populate('comments.user', 'username');

      // Check if the event exists
      if (!event) {
          return res.status(404).json({ message: 'Event not found' });
      }

      // Return the event details
      return res.status(200).json(event);
  } catch (error) {
      // Handle any errors that occur
      return res.status(500).json({ message: error.message });
  }
};

export default getEventById;


export { getEventById };

const getMyEvents = async (req, res) => {
  try {
    const userId = req.user.id; // Get the logged-in user ID from the request
    const events = await Event.find({ createdBy: userId }) // Fetch events created by this user
      .populate("createdBy", "username image") // Populate user details if necessary
      .populate("comments.user", "username"); // Populate comment user details if necessary
    return res.json({ events });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const likeEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Event.findOne({ _id: req.params.id });

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
    const post = await Event.findById(id);
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
    const post = await Event.findById(postId);

    if (!post) return res.status(404).json({ message: "Event not found" });

    // Filter
    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );
    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export {
  createEvent,
  editEvent,
  deleteEvent,
  likeEvent,
  deleteComment,
  addComment,
  getEvents,
  getMyEvents,
};
