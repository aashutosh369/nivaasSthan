// mongoose se hame userSchema banana hai to hame mongoose ko import kr na hoga 
import mongoose from "mongoose";
// signup ke time pr jo jo information chahiye uss ke liye ham ek userSchema bana lete hain...
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    listing : [{ // linking it to the (listing Schema) it can access all the value through populate method 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Listing",
    }],
    booking : [{  // linking userSchema to bookingSchema 
        type : mongoose.Schema.Types.ObjectId,
        ref : "Listing"
    }]
},{ timestamps : true }); // saves time of all record creation 

const userModel = mongoose.model("User",userSchema); // user name ka ek model create ho jayega jiss me user ka details rahega 

export default userModel;