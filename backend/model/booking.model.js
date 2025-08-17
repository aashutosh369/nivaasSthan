import mongoose from "mongoose";
import userModel from "./user.model.js";
const bookingSchema = new mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
    },
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: userModel,
      required: true,
    },
    status: {
      type: String,
      enum: ["booked", "cancel"],
      default: "booked",
    },
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      required: true,
    },
    totalRent: {
      type: Number,
      required : true,
    },
    ratings:{
        type:Number,
        min:0,
        max:5,
        default:0
    }
  },
  { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking ;
