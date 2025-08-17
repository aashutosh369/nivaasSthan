import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import userModel from "../model/user.model.js";

export const addListing = async (req, res) => {
  try {
    let host = req.userId;
    let { title, description, rent, city, landmark, category } = req.body;
    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);

    let listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host,
    });

    let user = await userModel.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ massage: "User not found!" });
    }

    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ massage: `addListing error ${error}` });
  }
};

export const getListing = async (req, res) => {
  try {
    let listings = await Listing.find().sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: `getListing error ${error}` });
  }
};

export const findListing = async (req, res) => {
  try {
    let id = req.params.id;
    let listing = await Listing.findById(id);
    if (!listing) {
      res.status(404).json({ massage: "Listing not found!" });
    }
    res.status(200).json(listing);
  } catch (error) {
    res.status(500).json({ massage: `findListing Error ${error}` });
  }
};

//**********************Update Listing******************************//

export const updateListing = async (req, res) => {
  try {
    let { id } = req.params;
    let { title, description, rent, city, landmark, category } = req.body;
    let image1 = await uploadOnCloudinary(req.files.image1[0].path);
    let image2 = await uploadOnCloudinary(req.files.image2[0].path);
    let image3 = await uploadOnCloudinary(req.files.image3[0].path);
    let listing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        rent,
        city,
        landmark,
        image1,
        image2,
        image3,
      },
      { new: true }
    );

    return res.status(201).json(listing);
  } catch (error) {
    console.log(`updateListing error ${error}`);
  }
};

// *********************Delete Listing**********************//

export const deleteListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found!" });
    }
    let user = await userModel.findByIdAndUpdate(
      listing.host,
      {
        $pull: { listing: listing._id },
      },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ massage: "user doesn't found!" });
    }
    return res.status(201).json({ massage: "Listing Deleted!" });
  } catch (error) {
    return res.status(500).json({ massage: `Delete Listing error ${error}` });
  }
};
