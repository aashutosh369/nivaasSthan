import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { listingDataContext } from "../Context/ListingContext.jsx";
import { userDataContext } from "../Context/UserContext.jsx";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext.jsx";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import { bookingDataContext } from "../Context/BookingContext.jsx";

function ViewCard() {
  let navigate = useNavigate();
  let { cardDetails } = useContext(listingDataContext);
  let { userData } = useContext(userDataContext);
  const { id } = useParams(); // yeh :id wala data yahan se milega
  // console.log(userData);
  // console.log("card details")
  // console.log(cardDetails)

  let { serverUrl } = useContext(authDataContext);
  let [updatePupUp, setUpdatePopUp] = useState(false);
  let [bookingPopUp, setBookingPopUp] = useState(false);
  let { updateButton, setUpdateButton } = useContext(listingDataContext);
  let { deleteing, setDeleteing } = useContext(listingDataContext);
  let [title, setTitle] = useState(cardDetails?.title || "");
  let [description, setDescription] = useState(cardDetails?.description || "");
  let [rent, setRent] = useState(cardDetails?.rent || "");
  let [city, setCity] = useState(cardDetails?.city || "");
  let [landmark, setLandmark] = useState(cardDetails?.landmark || "");
  let [backendImage1, setBackendImage1] = useState(null);
  let [backendImage2, setBackendImage2] = useState(null);
  let [backendImage3, setBackendImage3] = useState(null);
  let [bookingButton, setBookingButton] = useState(false);
  let [minDate, setMinDate] = useState("");
  let {
    checkIn,
    setCheckIn,
    checkOut,
    setCheckOut,
    total,
    setTotal,
    night,
    setNight,
    handleBooking,
  } = useContext(bookingDataContext);

  useEffect(() => {
    if (checkIn && checkOut) {
      let inDate = new Date(checkIn);
      let outDate = new Date(checkOut);
      let n = (outDate - inDate) / (24 * 60 * 60 * 1000);
      setNight(n);
      let nivaasSthanCharge = cardDetails.rent * (15 / 100);
      let GST = cardDetails.rent * (12 / 100);

      if (n > 0) {
        setTotal(cardDetails.rent * n + nivaasSthanCharge + GST);
      } else {
        setTotal(0);
      }
    }
  }, [checkIn, checkOut, cardDetails.rent, total]);

  const handleUpdate = async () => {
    try {
      setUpdateButton(true);
      let formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("image1", backendImage1);
      formData.append("image2", backendImage2);
      formData.append("image3", backendImage3);

      let result = await axios.post(
        serverUrl + `api/listing/update/${cardDetails._id}`,
        formData,
        { withCredentials: true }
      );
      console.log(result);
      setUpdateButton(false);
      navigate("/");
      setTitle("");
      setDescription("");
      setRent("");
      setBackendImage1(null);
      setBackendImage2(null);
      setBackendImage3(null);
      setLandmark("");
      setCity("");
    } catch (error) {
      console.log(`update listing error ${error}`);
      console.log(error);
    }
  };

  const handleImage1 = (e) => {
    let file = e.target.files[0];
    setBackendImage1(file);
  };

  const handleImage2 = (e) => {
    let file = e.target.files[0];
    setBackendImage2(file);
  };

  const handleImage3 = (e) => {
    let file = e.target.files[0];
    setBackendImage3(file);
  };

  //*****************Delete Listing****************//
  const handleDeleteListing = async () => {
    try {
      setDeleteing(true);
      let result = await axios.delete(
        serverUrl + `api/listing/deletelisting/${cardDetails._id}`,
        { withCredentials: true }
      );
      setDeleteing(false);
      navigate("/");
      console.log("listing deleted!");
    } catch (error) {
      setDeleteing(false);
      console.log("axios delete listing error!");
      console.log(error);
    }
  };

  useEffect(() => {
    let today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);

  return (
    <div className="w-[100%] h-[100vh] flex items-center mt-10 justify-center overflow-auto flex-col">
      <div className="back">
        <TiArrowBack
          className="h-[30px] w-[30px] absolute left-[2%] top-[2%] cursor-pointer text-[orange]"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="w-[95%] flex items-start md:items-start md:justify-start justify-start text-[25px] md:w-[80%] mb-10 flex-col mt-[220px]">
        <h1 className="text-[20px] mb-3 md:text-[30px] text-ellipsis overflow-hidden whitespace-nowrap mt-5 text-start w-[250px] md:w-[auto]">
          {`In ${cardDetails?.landmark.toUpperCase() || ""},  ${
            cardDetails?.city.toUpperCase() || ""
          } `}
        </h1>

        <div className="w-[95%] h-[400px] flex items-center mb-3 justify-center flex-col md:w-[80%] md:flex-row">
          <div
            className="w-[95%] h-[100%] md:w-[60%] md:h-[100%] border-2 border-white bg-red-600 overflow-hidden flex justify-center items-center
                "
          >
            <img
              src={cardDetails?.image1 || null}
              alt=""
              className="w-[100%] h-[100%]"
            />
          </div>
          <div className="md:w-[40%] md:h-[100%] w-[95%] h-[100%] bg-blue-100 flex flex-row md:flex-col">
            <div className="w-[50%] md:w-[100%] md:h-[50%] h-[100%] border-2 border-white bg-amber-50">
              <img
                src={cardDetails?.image2 || null}
                alt=""
                className="w-[100%] h-[100%]"
              />
            </div>
            <div className="w-[50%] md:w-[100%] md:h-[50%] h-[100%] border-2 border-white bg-amber-500">
              <img
                src={cardDetails?.image3 || null}
                alt=""
                className="w-[100%] h-[100%]"
              />
            </div>
          </div>
        </div>

        <div className="w-[95%] text-[18px] md:w-[80%] md:text-[25px] mb-3">
          {`${cardDetails?.title.toUpperCase() || ""}, ${
            cardDetails?.category.toUpperCase() || ""
          }`}
        </div>
        <div className="w-[95%] text-[10px] md:w-[80%] md:text-[16px] text-gray text-gray-700">
          {`${cardDetails?.description || ""} `}
        </div>
        <div className="w-[95%] text-[20px] md:w-[80%] md:text-[25px] mt-2 flex justify-start items-center gap-3 flex-row">
          <span>
            <FaIndianRupeeSign />
          </span>{" "}
          <span> {cardDetails?.rent || ""} </span>
        </div>

        {userData?._id == cardDetails?.host && (
          <button
            className="px-12 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton mb-10 m-auto text-nowrap text-2xl"
            type="submit"
            
            // disabled={adding == true}
            onClick={() => setUpdatePopUp(true)}
            // onClick={()=>{console.log("button clicked")}}
          >
            Edit
          </button>
        )}

        {cardDetails?.host != userData?._id && (
          <button
            className="px-12 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton mb-10 m-auto text-nowrap text-2xl"
            type="submit"
            // onClick={setBookingPopUp(true)}
            // onClick={handleAddListing}
            //   onClick={() => navigate("/listingpage3")}
            // disabled={adding == true}
            // onClick={}
            onClick={() => setBookingPopUp(true)}
          >
            {/* {adding?"adding..." : "Add"} */}
            Book
          </button>
        )}
      </div>

      {/* *********************************update popup*********************************** */}

      {updatePupUp && (
        <div className="w-[100vw] h-[100vh] bg-[#08010194] backdrop-blur-sm z-[100] absolute top-0 flex justify-center items-center text-white">
          <RxCross1
            className="h-[30px] w-[30px] absolute left-[2%] top-[2%] cursor-pointer text-[orange]"
            onClick={() => setUpdatePopUp(false)}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
              // setUpdateButton(true)
            }}
            action=""
            className="max-w-[900px] w-[90%] h-[600px] flex items-center justify-center pt-50 flex-col md:item-start gap-[15px] overflow-auto mt-[50px] bg-[#323131e6]"
          >
            <div className="w-[200px] h-[50px] text-[20px] bg-[#0ABAB5] text-white flex items-center justify-center rounded-[30px] absolute top-[15px] right-[10px] shadow-lg">
              SetUp your Home
            </div>

            <div className="w-[90%] flex item-start justify-start flex-col gap-[10px] mt-50">
              <label htmlFor="title" className="text-[20px] ">
                Title
              </label>
              <input
                type="text"
                id="title"
                required
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
              />
            </div>

            <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
              <label htmlFor="description" className="text-[20px] ">
                Description
              </label>
              <textarea
                name=""
                id="description"
                required
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
                className="w-[90%] h-[80px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
              ></textarea>
            </div>

            <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
              <label htmlFor="img1" className="text-[20px] ">
                Image 1
              </label>
              <div className="flex items-center justify-center w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                <input
                  type="file"
                  id="img1"
                  required
                  onChange={handleImage1}
                  className="w-[100%] text-[15px] px-[10px]"
                />
              </div>
            </div>

            <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
              <label htmlFor="img2" className="text-[20px] ">
                Image 2
              </label>
              <div className="flex items-center justify-center w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                <input
                  type="file"
                  id="img2a"
                  required
                  onChange={handleImage2}
                  className="w-[100%] text-[15px] px-[10px]"
                />
              </div>
            </div>

            <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
              <label htmlFor="img3" className="text-[20px] ">
                Image 3
              </label>
              <div className="flex items-center justify-center w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]">
                <input
                  type="file"
                  id="img3a"
                  required
                  onChange={handleImage3}
                  className="w-[100%] text-[15px] px-[10px]"
                />
              </div>
            </div>

            <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
              <label htmlFor="rent" className="text-[20px] ">
                Rent
              </label>
              <input
                type="number"
                id="rent"
                required
                value={rent}
                onChange={(e) => {
                  setRent(e.target.value);
                }}
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
              />
            </div>

            <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
              <label htmlFor="city" className="text-[20px] ">
                City
              </label>
              <input
                type="text"
                id="city"
                required
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
              />
            </div>

            <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
              <label htmlFor="landmark" className="text-[20px] ">
                Landmark
              </label>
              <input
                type="text"
                id="landmark"
                required
                value={landmark}
                onChange={(e) => {
                  setLandmark(e.target.value);
                }}
                className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
              />
            </div>
            <div className="flex justify-start items-center flex-row gap-10">
              <button
                className="p-0 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton mb-10 md:text-xl"
                type="submit"
              >
                {updateButton ? "updating..." : "Update"}
              </button>
              <button
                className="p-2  py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[50%] signupButton mb-10 text-nowrap text-[14px] md:text-xl text-center"
                type="button"
                onClick={handleDeleteListing}
                desabled={deleteing}
              >
                {deleteing ? "Deleting..." : "Delete Listing"}
              </button>
            </div>
          </form>
        </div>
      )}
      {/* **************booking popup**************** */}
      {bookingPopUp && (
        <div className="w-[100vw] min-h-[100%] bg-[#fdfdfd78] backdrop-blur-sm z-[100] absolute top-0 flex justify-center items-center text-white gap-10 flex-col md:flex-row">
          <RxCross1
            className="h-[30px] w-[30px] absolute left-[2%] top-[2%] cursor-pointer text-[orange] bg-black rounded-xl"
            onClick={() => setBookingPopUp(false)}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            action=""
            className="max-w-[450px] w-[90%] h-[450px] overflow-auto bg-[#f5e9e9e2] p-[20px] rounded-lg flex items-center justify-start flex-col gap-[10px] border-[1px] border-[#dedddd] text-black"
          >
            <h1 className="w-[100%] flex items-center justify-center py-[10px] text-[25px] border-b-[1px] border-[#a3a3a3]">
              Confirm & Book..
            </h1>

            <div className="w-[100%] h-[70%] mt-[10px] rounded-lg p-[10px]">
              <h3 className="text-[19px] font-semibold"> Your Trip -</h3>
              <div className="w-[90%] flex items-center justify-start] gap-[24px] mt-[20px] md:justify-center flex-col md:flex-row md:items-start">
                <label htmlFor="checkin" className="text-[18px] md:text-[20px]">
                  CheckIn
                </label>
                <input
                  type="date"
                  min={minDate}
                  id="checkIn"
                  className="border-[#555656] border-2 w-[200px] h-[40px] rounded-[10px] bg-transparent px-[10px] text-[15px] md:text-[18px]"
                  required
                  onChange={(e) => setCheckIn(e.target.value)}
                  value={checkIn}
                />
              </div>
              <div className="w-[90%] flex items-center justify-start] gap-[10px] mt-[40px] md:justify-center flex-col md:flex-row md:items-start">
                <label
                  htmlFor="checkOut"
                  className="text-[18px] md:text-[20px]"
                >
                  CheckOut
                </label>
                <input
                  type="date"
                  min={minDate}
                  id="checkOut"
                  className="border-[#555656] border-2 w-[200px] h-[40px] rounded-[10px] bg-transparent px-[10px] text-[15px] md:text-[18px]"
                  required
                  onChange={(e) => setCheckOut(e.target.value)}
                  value={checkOut}
                />
              </div>
              <div className="w-[100%] flex items-center justify-center">
                <button
                  disabled={bookingButton==true}
                  className="px-[80px] py-[10px] bg-[red] text-[white] text-[18px] md:px-[100px]  rounded-lg  text-nowrap mt-[30px] "
                  onClick={() => {
                    handleBooking(cardDetails._id);
                    setBookingButton(true);
                    navigate("/")
                  }}
                >
                  {bookingButton ? "Booking..." : "Book Now"}
                </button>
              </div>
            </div>
          </form>

          <div className="max-w-[450px] w-[90%] min-h-[450px]  bg-[#f7fbfcfe] p-[20px] rounded-lg flex items-center justify-center flex-col gap-[10px]   border-[1px] border-[#e2e1e1]">
            <div className="w-[95%] h-[30%] border-[1px] border-[#9b9a9a] rounded-lg flex justify-center items-center gap-[8px] p-[20px] overflow-hidden">
              <div className="w-[70px] h-[90px] flex items-center justify-center flex-shrink-0 rounded-lg md:w-[100px] md:h-[100px]">
                <img
                  className="w-[100%] h-[100%] rounded-lg"
                  src={cardDetails.image1}
                  alt=""
                />
              </div>
              <div className="w-[80%] h-[100px] gap-[5px] text-black ">
                <h1 className="w-[90%] truncate">{`IN ${cardDetails.landmark.toUpperCase()},${cardDetails.city.toUpperCase()} `}</h1>
                <h1>{cardDetails.title.toUpperCase()}</h1>
                <h1>{cardDetails.category.toUpperCase()}</h1>
                <h1 className="flex items-center justify-start gap-[5px]">
                  <FaStar className="text-[#eb6262]" />
                  {cardDetails.ratings}
                </h1>
              </div>
            </div>
            <div className=" w-[95%] min-h-[60%] border-[1px] border-[#abaaaa] rounded-lg flex justify-start items-start p-[20px] gap-[15px] flex-col text-black">
              <h1 className="text-[22px] font-semibold">Booking Price - </h1>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">
                  {`₹${cardDetails.rent} X ${night} nights`}
                </span>
                <span>{cardDetails.rent * night}</span>
              </p>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">Tax</span>
                <span>{((cardDetails.rent * 12) / 100).toFixed(2)}</span>
              </p>
              <p className="w-[100%] flex justify-between items-center px-[20px] border-b-[1px] border-gray-500 pb-[10px]">
                <span className="font-semibold">nivaasSthan Charge</span>
                <span>{((cardDetails.rent * 15) / 100).toFixed(2)}</span>
              </p>
              <p className="w-[100%] flex justify-between items-center px-[20px]">
                <span className="font-semibold">Total Price</span>
                <span className="font-semibold">{total.toFixed(2)}</span>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCard;
