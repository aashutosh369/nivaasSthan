import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

import { FaFire } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { GiSpookyHouse } from "react-icons/gi";
import { MdOutlinePool } from "react-icons/md";
import { FcHome } from "react-icons/fc";
import { FaBuilding } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { BsShop } from "react-icons/bs";
import { GiWoodCabin } from "react-icons/gi";
import { listingDataContext } from "../Context/listingContext";

function ListingPage2() {
  let { category, setCategory } = useContext(listingDataContext);

  let navigate = useNavigate();
  return (
    <div className="w-[100%] h-[100vh] bg-gray-900 flex items-center justify-center overflow-auto">
      <div className="back">
        <TiArrowBack
          className="h-[30px] w-[30px] absolute left-[2%] top-[2%] cursor-pointer text-[orange]"
          onClick={() => navigate("/listingpage1")}
        />
      </div>

      <div className="w-[200px] h-[50px] text-[20px] bg-[#0ABAB5] text-white flex items-center justify-center rounded-[30px] absolute top-[15px] right-[10px] shadow-lg">
        SetUp your Home
      </div>

      <div className="max-w-[900px] w-[100%] md:w-[80%] h-[600px] flex item-center justify-start gap-[25px] mt-[50px] bg-amber-100 flex-col overflow-auto text-center">
        <h1 className="mt-5">Which of these best describe your place ?</h1>
        <div className="flex item-center justify-center gap-9 sm:flex-row flex-col m-auto mt-8">
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg bg-amber-400 flex-col ${
              category == "villa" ? "border-5 border-white " : ""
            }`}
            onClick={() => {
              setCategory("villa");
              console.log(category);
            }}
          >
            {/* <FaFire className="w-[30px] h-[30px] text-black"></FaFire> */}

            <GiFamilyHouse className="w-[30px] h-[30px] text-black"></GiFamilyHouse>
            <h3>Villa</h3>
          </div>

          <div
            className={`w-[180px] h-[100px] flex justify-center items-center cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg bg-amber-400 flex-col ${
              category == "farmHouse" ? "border-5 border-white" : ""
            }`}
            onClick={() => {
              setCategory("farmHouse");
              console.log(category);
            }}
          >
            {/* <FaFire className="w-[30px] h-[30px] text-black"></FaFire> */}

            <GiSpookyHouse className="w-[30px] h-[30px] text-black"></GiSpookyHouse>
            <h3>Farm House</h3>
          </div>

          <div
            className={`w-[180px] h-[100px] flex justify-center items-center cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg bg-amber-400 flex-col ${
              category == "poolHouse" ? "border-5 border-white" : ""
            }`}
            onClick={() => {
              setCategory("poolHouse");
            }}
          >
            {/* <FaFire className="w-[30px] h-[30px] text-black"></FaFire> */}

            <MdOutlinePool className="w-[30px] h-[30px] text-black"></MdOutlinePool>
            <h3>Pool House</h3>
          </div>
        </div>
        <div className="flex item-center justify-center gap-9 sm:flex-row flex-col m-auto">
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg bg-amber-400 flex-col ${
              category == "pg" ? "border-5 border-white" : ""
            }`}
            onClick={() => {
              setCategory("pg");
              console.log(category);
            }}
          >
            {/* <FaFire className="w-[30px] h-[30px] text-black"></FaFire> */}

            <FaBuilding className="w-[30px] h-[30px] text-black"></FaBuilding>
            <h3>PG</h3>
          </div>

          <div
            className={`w-[180px] h-[100px] flex justify-center items-center cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg bg-amber-400 flex-col ${
              category == "flat" ? "border-5 border-white" : ""
            }`}
            onClick={() => {
              setCategory("flat");
              console.log(category);
            }}
          >
            {/* <FaFire className="w-[30px] h-[30px] text-black"></FaFire> */}

            <BsBuildings className="w-[30px] h-[30px] text-black"></BsBuildings>
            <h3>Flat</h3>
          </div>

          <div
            className={`w-[180px] h-[100px] flex justify-center items-center cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg bg-amber-400 flex-col ${
              category == "cabin" ? "border-5 border-white" : ""
            }`}
            onClick={() => {
              setCategory("cabin");
              console.log(category);
            }}
          >
            {/* <FaFire className="w-[30px] h-[30px] text-black"></FaFire> */}

            <GiWoodCabin className="w-[30px] h-[30px] text-black"></GiWoodCabin>
            <h3>Cabin</h3>
          </div>
        </div>
        <div className="flex item-center justify-center gap-9 sm:flex-row flex-col m-auto">
          <div
            className={`w-[180px] h-[100px] flex justify-center items-center cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg bg-amber-400 flex-col ${
              category == "shop" ? "border-5 border-white" : ""
            }`}
            onClick={() => {
              setCategory("shop");
              console.log(category);
            }}
          >
            {/* <FaFire className="w-[30px] h-[30px] text-black"></FaFire> */}

            <BsShop className="w-[30px] h-[30px] text-black"></BsShop>
            <h3>Shop</h3>
          </div>

          <div
            className={`w-[180px] h-[100px] flex justify-center items-center cursor-pointer border-[2px] hover:border-[#a6a5a5] text-[16px] rounded-lg bg-amber-400 flex-col ${
              category == "home" ? "border-5 border-white " : ""
            }`}
            onClick={() => {
              setCategory("home");
              console.log(category);
            }}
          >
            {/* <FaFire className="w-[30px] h-[30px] text-black"></FaFire> */}

            <FcHome className="w-[30px] h-[30px] text-black"></FcHome>
            <h3>Home</h3>
          </div>
        </div>
        <button
          className="px-12 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton mb-10 m-auto"
          type="submit"
          onClick={() => navigate("/listingpage3")}
          disabled={!category}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListingPage2;
