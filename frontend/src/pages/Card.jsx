import React, { useContext, useState } from "react";
import { LuIndianRupee } from "react-icons/lu";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";

import { FcCancel } from "react-icons/fc";
import { bookingDataContext } from "../Context/BookingContext";
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
  ratings,
  isBooked,
  host,
}) {
  console.log(ratings);
  let { userData } = useContext(userDataContext);
  let { handleViewCard } = useContext(listingDataContext);
  let navigate = useNavigate();
  let [popUp, setPopUp] = useState(false);
  let { cancelBooking } = useContext(bookingDataContext);
  const handleClick = () => {
    if (userData) {
      handleViewCard(id);
    } else {
      navigate("/login");
    }
  };
  return (
    <div
      className="w-[330px] max-w-[85%] h-[460px] rounded-lg flex items-start justify-start cursor-pointer p-2 flex-col hover:shadow-lg relative"
      onClick={() => (!isBooked ? handleClick() : null)}
    >
      {isBooked && (
        <div className="text-[green] bg-white rounded-lg absolute flex items-center justify-center right-[10px] top-[10px] gap-[5px] p-[5px]">
          <GiConfirmed className="w-[20px] h-[20px] text-[green]" />
          Booked
        </div>
      )}

      {isBooked && host == userData?._id && (
        <div
          className="text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px]"
          onClick={() => setPopUp(true)}
        >
          <FcCancel className="w-[20px] h-[20px]" />
          Cancel Booking
        </div>
      )}

      {popUp && (
        <div className="w-[300px] h-[100px]  bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg ">
          <div className="w-[100%] h-[50%] text-[#2e2d2d] flex items-start justify-center rounded-lg overflow-auto text-[20px]  p-[10px]">
            Booking Cancel!
          </div>
          <div className="w-[100%] h-[50%] text-[18px] font-semibold flex items-start justify-center gap-[10px] text-[#986b6b]">
            Are you sure?{" "}
            <button
              className="px-[20px] bg-[red] text-[white] rounded-lg hover:bg-slate-600 "
              onClick={() => {
                cancelBooking(id);
                setPopUp(false);
              }}
            >
              Yes
            </button>
            <button
              className="px-[10px] bg-[red] text-[white] rounded-lg hover:bg-slate-600"
              onClick={() => setPopUp(false)}
            >
              No
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-start items-center overflow-auto w-[100%] h-[55%] bg-[#2e2d2d] rounded-lg ">
        <img src={image1} alt="" className="w-[100%] h-full flex-shrink-0 object-cover" />
        <img src={image2} alt="" className="w-[100%] h-full flex-shrink-0 object-cover" />
        <img src={image3} alt="" className="w-[100%] h-full flex-shrink-0 object-cover" />
      </div>

      <div className="w-[100%] h-[33%] py-[20px] flex flex-col mt-5 gap-3">
        <div className="flex justify-between">
          <span className="text-ellipsis w-[80%] font-semibold">
            {(landmark || "UNKNOWN").toUpperCase()},{" "}
            {(city || "UNKNOWN").toUpperCase()}{" "}
          </span>
          <span className="flex items-center justify-center gap-2 text-[18px]">
            <FaStar className="text-[#ff7e39]" />
            {ratings}
          </span>
        </div>
        <span>{(title || "UNKNOWN").toUpperCase()}</span>
        <span>
          <LuIndianRupee className="rupees" />
          {rent}/day
        </span>
      </div>
    </div>
  );
}

export default Card;
