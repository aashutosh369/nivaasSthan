import express from "express"
import isAuth from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"
import { addListing, deleteListing, findListing, getListing, updateListing } from "../controllers/listing.controller.js"

let listingRouter = express.Router()

listingRouter.post("/add",isAuth,upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2", maxCount:1},
    {name: "image3", maxCount:1}
]),addListing)

listingRouter.get("/get",getListing)
// *******************Update Route*****************//
listingRouter.get("/findlistingbyid/:id",isAuth,findListing)
listingRouter.post("/update/:id",isAuth,upload.fields([
    {name:"image1",maxCount:1},
    {name:"image2",maxCount:1},
    {name:"image3",maxCount:1}
]),updateListing)


// *******************Delete Route*****************//
listingRouter.delete("/deletelisting/:id",isAuth,deleteListing)

export default listingRouter; 