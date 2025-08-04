import React, { useContext, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaFire } from "react-icons/fa";
import { GiFamilyHouse } from "react-icons/gi";
import { GiSpookyHouse } from "react-icons/gi";
import { MdOutlinePool } from "react-icons/md";
import { FcHome } from "react-icons/fc";
import { FaBuilding } from "react-icons/fa";
import { BsBuildings } from "react-icons/bs";
import { BsShop } from "react-icons/bs";
import { GiWoodCabin } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";

import { BsSearchHeart } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { authDataContext } from "../Context/AuthContext";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";
import { listingDataContext } from "../Context/ListingContext";

function Navbar() {
  let navigate = useNavigate();
  let [showUserPopup, setShowUserPopup] = useState(false);
  let [alert, setAlert] = useState(false);
  let { serverUrl } = useContext(authDataContext); // authDataContext se ham serverUrl ka use kr sakte hain
  let { userData, setUserData } = useContext(userDataContext); // userDataContext se ham loggedin user ka information ko access kr sakte hain
  let [cat, setCat] = useState();
  let { listingData, setListingData, originalListingData } =
    useContext(listingDataContext);

  const handleLogout = async () => {
    try {
      let LogoutResult = await axios.post(serverUrl + "api/auth/logout", {
        withCredentials: true,
      }); // backend me axios ke through post request bheja ja rha hai
      setUserData(null); // logout ho to userData null ho jaye
      setAlert(() => (prev) => !prev);
      setTimeout(() => {
        setAlert(() => {
          (prev) => !prev;
        });
      }, 3000);
      console.log(LogoutResult);
      console.log("Logout Successfull!");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategory = (category) => {
    setCat(category);
    let filteredData = originalListingData.filter((list) => {
     return list.category == category;
    });
    setListingData(filteredData);
  };

  const handleCategoryTrendingData = (category) => {
    setCat(category);
    if(category == "trending"){
      setListingData(originalListingData);
    }
  }

  return (
    <div className="bg-white fixed top-0 w-[100%]">
      <div className=" w-100% h-[80px] border-b-[1px] border-[#c8c8c8] flex flex-row justify-between items-center">
        <div className="mx-3">
          <img src="Logo.jpg" alt="" className="h-[60px] w-[70%] sm:w-[100%]" />
        </div>
        <div className="flex flex-row items-center relative w-[30%]  md:block hidden">
          <input
            type="text"
            placeholder="Any Where | Any Location | Any Time "
            className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px] hover:shadow-lg"
          />
          <button className="absolute p-[10px] rounded-[50%] bg-[#00e1ff] right-[3%] top-[5px] hover:shadow-lg">
            <BsSearchHeart className="w-[20px] h-[20px] " />
          </button>
        </div>
        <div className="flex justify-center items-center  gap-[10px] mx-2 relative">
          <p
            className="text-[18px] cursor-pointer rounded-[30px] hover:bg-[#ded9d9] px-[8px] py-[5px] hidden md:block "
            onClick={() => {
              navigate("/listingpage1");
              // userData ? navigate("/listingpage1") : navigate("/login");
            }}
          >
            List Your Home
          </p>
          <div
            className="flex justify-center border-[2px] rounded-[30px] gap-5 p-1 px-2 hover:shadow-lg border-[#bdbaba]"
            onClick={() => setShowUserPopup((prev) => !prev)}
          >
            {/* user login hone pr name dikhega aur logout hone pr userIcon dikhega */}
            {userData == null && (
              <CgProfile className="text-[25px] cursor-pointer" />
            )}
            {userData != null && (
              <span className=" w-[30px] h-[30px] bg-black text-white rounded-full flex justify-center items-center text-[17px]">
                {userData.name.slice(0, 1)}
              </span>
            )}
            <GiHamburgerMenu className="text-[25px] cursor-pointer" />
          </div>

          {/* user click div */}

          {showUserPopup && (
            <div className="w-[220px] h-[250px]  border-[1px] rounded-lg absolute top-[120%] right-[11%] z-10 border-[#aaa9a9] bg-[#f5f4f4]">
              <ul className="w-[100%] h-[100%] text-[17px] flex items-start justify-around flex-col">
                {!userData && (
                  <li
                    className="w-[100%] py-[10px] px-[10px] hover:bg-[#ffffff] cursor-pointer"
                    onClick={() => {
                      setShowUserPopup(false);
                      navigate("/login");
                    }}
                  >
                    Login
                  </li>
                )}
                {userData && (
                  <li
                    className="w-[100%] py-[10px] px-[10px] hover:bg-[#ffffff] cursor-pointer"
                    onClick={() => {
                      setShowUserPopup(false);
                      handleLogout();
                    }}
                  >
                    Logout
                  </li>
                )}
                <div className="w-[100%] h-[1px] bg-[#d8d6d6]"></div>
                <li
                  className="w-[100%] py-[10px] px-[10px] hover:bg-[#ffffff] cursor-pointer"
                  onClick={() => {
                    setShowUserPopup(false);
                    navigate("/listingpage1");
                    // userData ? navigate("/listingpage1") : navigate("/login")
                  }}
                >
                  List your Home
                </li>
                <li
                  className="w-[100%] py-[10px] px-[10px] hover:bg-[#ffffff] cursor-pointer"
                  onClick={() => {
                    setShowUserPopup(false);
                    navigate("/mylisting");
                  }}
                >
                  My Listing
                </li>
                <li
                  className="w-[100%] py-[10px] px-[10px] hover:bg-[#ffffff] cursor-pointer"
                  onClick={() => {
                    setShowUserPopup(false);
                  }}
                >
                  Check Booking
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* logout popup */}
      {alert && (
        <div className="text-red-800 bg-red-100 border border-red-300 text-center w-[20%] rounded-lg absolute left-0 p-3">
          LoggedOut Successfully!
        </div>
      )}

      {/* search box small screen */}
      <div className="flex flex-row items-center relative w-[70%] md:hidden my-2 mx-auto">
        <input
          type="text"
          placeholder="Any Where | Any Location | Any Time "
          className="w-[100%] px-[30px] py-[10px] border-[2px] border-[#bdbaba] outline-none overflow-auto rounded-[30px] text-[17px] hover:shadow-lg"
        />
        <button className="absolute p-[10px] rounded-[50%] bg-[#00e1ff] right-[3%] top-[5px] hover:shadow-lg">
          <BsSearchHeart className="w-[20px] h-[20px] " />
        </button>
      </div>

      {/* // imogie icons  */}
      <div className="w-100% h-[80px] flex flex-row justify-start md:justify-center items-center gap-9 overflow-auto px-7 text-nowrap">
        <div className="flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] "  onClick={()=>handleCategoryTrendingData("trending")}>
          <FaFire className="w-[30px] h-[30px] text-black" />
          <h3>Trending</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cat == "villa" ? "border-b-4 border-[#a6a5a5]" : ""
          } `}
          onClick={() =>
            // setCat( "villa")

            handleCategory("villa")
          }
        >
          <GiFamilyHouse className="w-[30px] h-[30px] text-black" />
          <h3>Villa</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cat == "farmHouse" ? "border-b-4 border-[#a6a5a5]" : ""
          }`}
          onClick={() => {
            // setCat( "farmHouse")
            handleCategory("farmHouse");
          }}
        >
          <GiSpookyHouse className="w-[30px] h-[30px] text-black " />
          <h3>Farm House</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cat == "poolHouse" ? "border-b-4 border-[#a6a5a5]" : ""
          }`}
          onClick={() => {
            // setCat( "poolHouse")
            handleCategory("poolHouse");
          }}
        >
          <MdOutlinePool className="w-[30px] h-[30px] text-black " />
          <h3>Pool House</h3>
        </div>

        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px]  ${
            cat == "pg" ? "border-b-4 border-[#a6a5a5]" : ""
          }`}
          onClick={() => {
            // setCat( "pg")
            handleCategory("pg");
          }}
        >
          <FaBuilding className="w-[30px] h-[30px] text-black" />
          <h3>PG</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cat == "flat" ? "border-b-4 border-[#a6a5a5]" : ""
          } `}
          onClick={() => {
            // setCat( "flat")
            handleCategory("flat");
          }}
        >
          <BsBuildings className="w-[30px] h-[30px] text-black" />
          <h3>Flat</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cat == "cabin" ? "border-b-4 border-[#a6a5a5]" : ""
          }`}
          onClick={() => {
            // setCat( "cabin")
            handleCategory("cabin");
          }}
        >
          <GiWoodCabin className="w-[30px] h-[30px] text-black" />
          <h3>Cabin</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cat == "shop" ? "border-b-4 border-[#a6a5a5]" : ""
          }`}
          onClick={() => {
            // setCat( "shop")
            handleCategory("shop");
          }}
        >
          <BsShop className="w-[30px] h-[30px] text-black" />
          <h3>Shop</h3>
        </div>
        <div
          className={`flex items-center justify-center flex-col hover:border-b-[1px] border-[#a6a5a5] text-[13px] ${
            cat == "room" ? "border-b-4 border-[#a6a5a5]" : ""
          }`}
          onClick={() => {
            // setCat( "room")
            handleCategory("room");
          }}
        >
          <FcHome className="w-[30px] h-[30px] text-black" />
          <h3>Room</h3>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
