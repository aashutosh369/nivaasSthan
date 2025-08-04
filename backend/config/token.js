// token user aur server ke bich me pass key ka work kr ta hai after login hame ek web token mill ta hai jo specific time period ke liye valid hota hai 

// jsonwebtoken ko import kr na hoga 

import jwt from "jsonwebtoken"

const generateToken = async (userId) => {
    try{
        let token = await jwt.sign({userId},process.env.JWT_SECRET, {expiresIn:"7d"})
        return token ; 
    }catch (error) {
        console.log("Error comes from (fenerateToken) ", error)
    }
}

export default generateToken;