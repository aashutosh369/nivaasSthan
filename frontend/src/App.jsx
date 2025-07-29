import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import ListingPage1 from "./pages/ListingPage1";
import ListingPage2 from "./pages/ListingPage2";
import ListingPage3 from "./pages/ListingPage3";
import { userDataContext } from "./Context/UserContext";

// import Loginn from "./pages/SignUp";

function App() {
  let { userData } = useContext(userDataContext);
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/login" element={<Login />}></Route>

        <Route path="/listingpage1" element={<ListingPage1 />}></Route>
        <Route path="/listingpage2" element={<ListingPage2 />}></Route>
        <Route path="/listingpage3" element={<ListingPage3 />}></Route>

        {/* <Route
          path="/listingpage1"
          element={
            userData != null ? (
              <ListingPage1 />
            ) : (
              <Navigate to={"/login"}></Navigate>
            )
          }
        ></Route>
        <Route
          path="/listingpage2"
          element={
            userData != null ? (
              <ListingPage2 />
            ) : (
              <Navigate to={"/login"}></Navigate>
            )
          }
        ></Route>
        <Route
          path="/listingpage3"
          element={
            userData != null ? (
              <ListingPage3 />
            ) : (
              <Navigate to={"/login"}></Navigate>
            )
          }
        ></Route> */}
        {/* <Route path="/n" element={<Loginn/>}></Route> */}
      </Routes>
    </>
  );
}

export default App;
