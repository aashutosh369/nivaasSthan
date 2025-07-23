// mongoose ko import kr rha hu kyuki mujhe mongodb ko apna database banana hai...
import mongoose from "mongoose";

//MONGODB_URL se connection banane ke liye ek callback function likhna hoga aur uss me hame try catch block me logic likhna hoga...

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB ! ");
    }catch(err){
        console.log("Failed to connect with MongoDB", err);
    }
}

export default connectDB;
