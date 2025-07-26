import React from "react";
import { Route, Routes } from "react-router-dom";


import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
// import Loginn from "./pages/SignUp";

function App() {
    return(
      <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        {/* <Route path="/n" element={<Loginn/>}></Route> */}
      </Routes>
      
      </>
    )
}

export default App;
