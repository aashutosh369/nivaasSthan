import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

function ListingPage3() {
    let navigate = useNavigate()
  return (
    <div className="w-[100%] h-[100vh] bg-gray-900 flex items-center justify-center overflow-auto">
      <div className="back">
        <TiArrowBack
          className="h-[30px] w-[30px] absolute left-[2%] top-[2%] cursor-pointer text-[orange]"
          onClick={() => navigate("/listingpage2")}
        />
      </div>
    </div>
  );
}

export default ListingPage3;
