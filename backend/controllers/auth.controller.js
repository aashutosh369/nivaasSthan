// user authentication ke liye pahle Signup karayenge fir signup ke basis pr email id match ke ke user ko login karayenge

//signup function ek callback function rahega uss ko banate hai

// pahle ham {User} ko userSchma  se import karenge kyuki yaha pr jo user hai uss ki schema ka use kr ke hi user create karenge..

import userModel from "../model/user.model.js";
import generateToken from "../config/token.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    let existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ massage: "User already exist!" });
    }
    let hashPassword = await bcrypt.hash(password, 10);
    let user = await userModel.create({ name, email, password: hashPassword });
    let token = await generateToken(user._id);
    res.cookie("token", token, {
      // httpOnly: true,
      // secure: process.env.NODE_ENVIRONMENT === "production",
      // sameSite:
      //   process.env.NODE_ENVIRONMENT === "production" ? "strict" : "none",
      httpOnly: true,
      secure: true, // always true in production
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(user);
  } catch (err) {
    return res.status(500).json({ massage: `Signup Failed! ${err}` });
  }
};

// signup function signup logic liaa huaa hai jo ki HTTP ke request pr run hona hai
// to signup ke liye ROUTE bana lete hai ye [authRoute.js] me likha jayega

// ab signup function ban jane ke baad ham login function ko banate hai ..

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email }).populate("listing");
    if (!user) {
      return res.status(400).json({ massage: "User does not exist ! " });
    }
    if (user) {
      let isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ massage: "Incorrect Password !" });
      }
      let token = await generateToken(user._id);
      res.cookie("token", token, {
        // httpOnly: true,
        // secure: process.env.NODE_ENVIRONMENT === "production",
        // sameSite: process.env.NODE_ENVIRONMENT === "production" ? "strict" : "none",
        httpOnly: true,
        secure: true, // always true in production
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(201).json({ massage: "Login Successful!", user });
    }
  } catch (error) {
    res.status(500).json({ massage: `Login Faield ! ${error}` });
  }
};

// writing function for logOut

export const logOut = async (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ massage: "Logout Successfylly!" });
  } catch (error) {
    return res.status(500).json({ massage: "Logout Failed", error });
  }
};
