// router banane ke liye hame (express ) ka use kr na hoga 

import express from "express";
import { login, logOut, signUp } from "../controllers/auth.controller.js";

const authRoute = express.Router();

authRoute.post("/signup",signUp)
authRoute.post("/login",login)
authRoute.post("/logout",logOut)


export default authRoute;