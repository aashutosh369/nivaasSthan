import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { userDataContext } from "../Context/UserContext";
import Card from "./Card.jsx";

function MyListing() {
  let navigate = useNavigate();
  let { userData, setUserData } = useContext(userDataContext);
  //   console.log(userData.listing.map((list) => list));
  const listings = userData?.listing || [];
  console.log(listings);
  return (
    <div className=" w-100% h-[100vh] flex flex-col justify-start items-center relative">
      <div className="back">
        <TiArrowBack
          className="h-[30px] w-[30px] absolute left-[2%] top-[2%] cursor-pointer text-[orange]"
          onClick={() => navigate("/")}
        />
      </div>

      <div className="w-[50%] h-[10%] border-2 border-black p-6 flex items-center justify-center text-16px rounded-md font-semibold mt-[20px] md:w-[600px] ">
        MY LISTING
      </div>
      <div className="w-[100%] h-[90%] flex items-center justify-center gap-10 mt-[60px] md:mt-[60px] pl-5 pr-5 flex-wrap">
        {listings.map((list, index) => (
          <Card
            key={index}
            title={list.title}
            rent={list.rent}
            city={list.city}
            landmark={list.landmark}
            image1={list.image1}
            image2={list.image2}
            image3={list.image3}
          ></Card>
        ))}
      </div>
    </div>
  );
}

export default MyListing;
