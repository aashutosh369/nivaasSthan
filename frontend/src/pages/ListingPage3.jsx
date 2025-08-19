import React, { useContext } from "react";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { listingDataContext } from "../Context/ListingContext.jsx";

function ListingPage3() {
  let {
    title,
    setTitle,
    description,
    setDescription,
    frontendImage1,
    setFrontendImage1,
    frontendImage2,
    setFrontendImage2,
    frontendImage3,
    setFrontendImage3,
    backendImage1,
    setBackendImage1,
    backendImage2,
    setBackendImage2,
    backendImage3,
    setBackendImage3,
    rent,
    setRent,
    city,
    setCity,
    landmark,
    setLandmark,
    category,
    setCategory,
    handleAddListing,
    adding,
    setAdding
  } = useContext(listingDataContext);
  let navigate = useNavigate();
  console.log(landmark);
  return (
    <div className="w-[100%] h-[100vh] flex items-start justify-center overflow-auto">
      <div className="back">
        <TiArrowBack
          className="h-[30px] w-[30px] absolute left-[2%] top-[2%] cursor-pointer text-[orange]"
          onClick={() => navigate("/listingpage2")}
        />
      </div>
      <div className="w-[95%] flex items-start justify-start text-[25px] md:w-[80%] mb-10 flex-col mt-6">
        <h1 className="text-[20px] text-[#ffffff] md:text-[30px] text-ellipsis text-nowrap overflow-hidden">
          {`In ${landmark.toUpperCase()},  ${city.toUpperCase()}`}
        </h1>

        <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
          <div
            className="w-[95%] h-[100%] md:w-[60%] md:h-[100%] border-2 border-white overflow-hidden flex justify-center items-center
            "
          >
            <img src={frontendImage1} alt="" className="w-[100%] h-[100%]" />
          </div>
          <div className="md:w-[40%] md:h-[100%] w-[95%] h-[100%] flex flex-row md:flex-col">
            <div className="w-[50%] md:w-[100%] md:h-[50%] h-[100%] border-2 border-white ">
              <img src={frontendImage2} alt="" className="w-[100%] h-[100%]" />
            </div>
            <div className="w-[50%] md:w-[100%] md:h-[50%] h-[100%] border-2 border-white ">
              <img src={frontendImage3} alt="" className="w-[100%] h-[100%]" />
            </div>
          </div>
        </div>

        <div className="w-[95%] text-[18px] md:w-[80%] md:text-[25px]">
        {`${title.toUpperCase() } ${category.toUpperCase()} ${landmark.toUpperCase()} `}
        </div>
        <div className="w-[95%] text-[14px] md:w-[80%] md:text-[25px] text-gray">
        {`${description.toUpperCase() } `}
        </div>
        <div className="w-[95%] text-[18px] md:w-[80%] md:text-[25px]">
        {`${rent }`}
        </div>

         <button
          className="px-12 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton mb-10 m-auto text-nowrap text-2xl"
          type="submit"
          onClick={handleAddListing}
        //   onClick={() => navigate("/listingpage3")}
          disabled={adding == true}
        >
         {adding?"adding..." : "Add"}
        </button>


      </div>
    </div>
  );
}

export default ListingPage3;
