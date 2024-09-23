import mongoose from "mongoose";
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    eventStartDate: { type: Date, required: true },
    eventEndDate: { type: Date, required: true },
    location: { type: String, required: true },
    eventType: {
      type: String,
      required: true,
      enum: [
        "Workshop",
        "Conference",
        "Seminar",
        "Panel Discussion",
        "Meetup",
        "Networking Event",
        "Festival",
        "Party",
      ],
    },
    attendees: { type: Number, required: true, min: 1 },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    comments: [
      {
        comment: String,
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);
export default Event;