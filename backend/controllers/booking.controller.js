import Booking from "../model/booking.model.js";
import Listing from "../model/listing.model.js";
import userModel from "../model/user.model.js";
export const createBooking = async (req, res) => {
  try {
    let { id } = req.params;
    let { checkIn, checkOut, totalRent } = req.body;

    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(400).json({ massage: "Listing not found!" });
    }
    if (new Date(checkIn) >= new Date(checkOut)) {
      return res
        .status(400)
        .json({ massage: "Invalid checkIn checkOut Date!" });
    }
    if (listing.isBooked) {
      return res.status(400).json({ massage: "Listing is already booked!" });
    }
    let booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host: listing.host,
      guest: req.userId,
      listing: listing._id,
    });
    let user = await userModel.findByIdAndUpdate(
      req.userId,
      {
        $push: { booking: listing },
      },
      { new: true }
    );
    if (!user) {
      return res
        .status(404)
        .json({ massage: "user not found in createBooking" });
    }
    listing.host = req.userId;
    listing.isBooked = true;
    await listing.save();
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ massage: `createBooling error ${error}` });
  }
};


export const cancelBooking = async (req,res) => {
    try {
        let {id} = req.params
        let listing = await Listing.findByIdAndUpdate(id,{isBooked:false})
        let user = await User.findByIdAndUpdate(listing.guest,{
            $pull:{booking:listing._id}
        },{new:true})
        if(!user){
            return res.status(404).json({message:"user is not found"})
        }
        return res.status(200).json({message:"booking cancelled"})

    } catch (error) {
        return res.status(500).json({message:"booking cancel error"})
    }
    
}