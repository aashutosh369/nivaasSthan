// user.controller me (getCurrentUser) function user ko db se find kr ne ke liye use kiaa jata hai 

import userModel from "../model/user.model.js"; // userModel ko import kr rha hai, kyuki db se user find kr na hai 

export const getCurrentUser = async (req, res) => {
  try {
    if (!req.userId) { // iss ke req object me isAuth middleware ke through (userId) aa gya hai {userRouter.get("/currentuser",isAuth,getCurrentUser)}
      return res
        .status(401)
        .json({ message: "Unauthorized: No userId found in request" });// agar userId nhi mili to ye massage show hoga...
    }
    let user = await userModel.findById(req.userId).select("-password").populate("listing");// agar userId mill gyi to db ke userModel se userID ke through user details ko find kr ke user varriable me store kr na... 
    if (!user) {
      res.status(400).json({ massage: "User doesn't found!" }); // agar user nhi mila to 
    }
    return res.status(200).json(user);
  } catch (error) { // agar getCurrentUser is functio me koi error aata hai to...
    res.status(500).json({ massage: `getCurrentUser error ${error}` });
  }
};
