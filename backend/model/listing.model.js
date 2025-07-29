import mongoose from "mongoose";
import userModel from "./user.model.js";

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    image1: {
      type: String,
      requird: true,
    },
    image2: {
      type: String,
      requird: true,
    },
    image3: {
      type: String,
      requird: true,
    },
    rent: {
      type: Number,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    isBooked: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema)

export default Listing ; 
