import React, { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Home from "./pages/Home.jsx";
import SignUp from "./pages/SignUp.jsx";
import ListingPage1 from "./pages/ListingPage1.jsx";
import ListingPage2 from "./pages/ListingPage2.jsx";
import ListingPage3 from "./pages/ListingPage3.jsx";
import { userDataContext } from "./Context/UserContext.jsx";
import MyListing from "./pages/MyListing.jsx";
import ViewCard from "./pages/ViewCard.jsx";
import MyBooking from "./pages/MyBooking.jsx";

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
        <Route path="/mylisting" element={<MyListing />}></Route>
        <Route path="/mybooking" element={<MyBooking />}></Route>
        <Route path="/viewcard/:id" element={<ViewCard />}></Route>
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
