import React, { useContext } from "react";
import { LuIndianRupee } from "react-icons/lu";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import { useNavigate } from "react-router-dom";

function Card({
  id,
  title,
  image1,
  image2,
  image3,
  description,
  city,
  rent,
  landmark,
}) {
  let {userData} = useContext(userDataContext);
  let {handleViewCard} = useContext(listingDataContext)
  let navigate = useNavigate();
  const handleClick = () => {
    if(userData){
      handleViewCard(id)
    }else{
      navigate("/login")
    }
  }
  return (
    <div className="w-[330px] max-w-[85%] h-[460px] rounded-lg flex items-start justify-start cursor-pointer p-2 flex-col hover:shadow-lg" onClick={ handleClick}>
      <div className="flex justify-start items-center overflow-auto w-[100%] h-[55%] bg-[#2e2d2d] rounded-lg ">
        <img src={image1} alt="" className="w-[100%] h-[100%] flex-shrink-0" />
        <img src={image2} alt="" className="w-[100%] h-[100%] flex-shrink-0" />
        <img src={image3} alt="" className="w-[100%] h-[100%] flex-shrink-0" />
      </div>

      <div className="w-[100%] h-[33%] py-[20px] flex flex-col mt-5 gap-3">
        <span className="text-ellipsis w-[80%] font-semibold">{(landmark || "UNKNOWN").toUpperCase()}, {(city || "UNKNOWN").toUpperCase()} </span>
        <span>{(title || "UNKNOWN").toUpperCase()}</span>
        <span><LuIndianRupee className="rupees"/>{rent}/day</span>
      </div>
    </div>
  );
}

export default Card;
