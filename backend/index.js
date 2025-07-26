import express from "express";
// for importing data base connection url we have to use dotenv , in dotenv file we can write the dbPORT and the sensitive information that we do not want to show the users 
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from "./routes/user.route.js";

dotenv.config();
// getting PORT from dotenv file 
let port = process.env.PORT || 6000;

const app = express() // express comes under -> (app)

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use(express.json())
app.use(cookieParser())

// creating get request to the server  
// app.get("/",(req,res)=>{
//     res.send("Response comes from Serve!");
// });

app.use("/api/auth", authRoute) // signup, login , logout Route
app.use("/api/user", userRouter)

// all requests coming from url at [http://localhost:8000/...] are listen by the express at the port ->.. 
app.listen(port, async ()=>{
    await connectDB()
    console.log(`Server Started! at PORT ${port}`)
})








// http://localhost:8000/api/auth/signup