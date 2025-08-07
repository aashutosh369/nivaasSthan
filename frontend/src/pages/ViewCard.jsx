import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { listingDataContext } from "../Context/ListingContext";
import { userDataContext } from "../Context/UserContext";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import { authDataContext } from "../Context/AuthContext";

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
  let {updateButton, setUpdateButton} = useContext(listingDataContext);
  let [title, setTitle] = useState(cardDetails.title);
  let [description, setDescription] = useState(cardDetails.description);
  let [rent, setRent] = useState(cardDetails.rent);
  let [city, setCity] = useState(cardDetails.city);
  let [landmark, setLandmark] = useState(cardDetails.landmark);
  let [backendImage1, setBackendImage1] = useState(null);
  let [backendImage2, setBackendImage2] = useState(null);
  let [backendImage3, setBackendImage3] = useState(null);

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
      setUpdateButton(false)
      navigate("/")
      setTitle('')
      setDescription('')
      setRent("")
      setBackendImage1(null)
      setBackendImage2(null)
      setBackendImage3(null)
      setLandmark("")
      setCity("")


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

  return (
    <div className="w-[100%] h-[100vh] flex items-center mt-10 justify-center overflow-auto flex-col">
      <div className="back">
        <TiArrowBack
          className="h-[30px] w-[30px] absolute left-[2%] top-[2%] cursor-pointer text-[orange]"
          onClick={() => navigate("/")}
        />
      </div>
      <div className="w-[95%] flex items-start md:items-start md:justify-start justify-start text-[25px] md:w-[80%] mb-10 flex-col mt-6">
        <h1 className="text-[20px]  md:text-[30px] text-ellipsis text-nowrap overflow-hidden mt-5 text-start">
          {`In ${cardDetails.landmark.toUpperCase()},  ${cardDetails.city.toUpperCase()}`}
        </h1>

        <div className="w-[95%] h-[400px] flex items-center justify-center flex-col md:w-[80%] md:flex-row">
          <div
            className="w-[95%] h-[100%] md:w-[60%] md:h-[100%] border-2 border-white bg-red-600 overflow-hidden flex justify-center items-center
                ">
            <img
              src={cardDetails.image1}
              alt=""
              className="w-[100%] h-[100%]"
            />
          </div>
          <div className="md:w-[40%] md:h-[100%] w-[95%] h-[100%] bg-blue-100 flex flex-row md:flex-col">
            <div className="w-[50%] md:w-[100%] md:h-[50%] h-[100%] border-2 border-white bg-amber-50">
              <img
                src={cardDetails.image2}
                alt=""
                className="w-[100%] h-[100%]"
              />
            </div>
            <div className="w-[50%] md:w-[100%] md:h-[50%] h-[100%] border-2 border-white bg-amber-500">
              <img
                src={cardDetails.image3}
                alt=""
                className="w-[100%] h-[100%]"
              />
            </div>
          </div>
        </div>

        <div className="w-[95%] text-[18px] md:w-[80%] md:text-[25px]">
          {`${cardDetails.title.toUpperCase()}, ${cardDetails.category.toUpperCase()}`}
        </div>
        <div className="w-[95%] text-[14px] md:w-[80%] md:text-[25px] text-gray">
          {`${cardDetails.description} `}
        </div>
        <div className="w-[95%] text-[18px] md:w-[80%] md:text-[25px]">
          {cardDetails.rent}
        </div>

        {userData._id == cardDetails.host && (
          <button
            className="px-12 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton mb-10 m-auto text-nowrap text-2xl"
            type="submit"
            // onClick={handleAddListing}
            //   onClick={() => navigate("/listingpage3")}
            // disabled={adding == true}
            onClick={() => setUpdatePopUp(true)}
          >
            {/* {adding?"adding..." : "Add"} */}
            edit
          </button>
        )}

        {cardDetails.host != userData._id && (
          <button
            className="px-12 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton mb-10 m-auto text-nowrap text-2xl"
            type="submit"
            // onClick={handleAddListing}
            //   onClick={() => navigate("/listingpage3")}
            // disabled={adding == true}
            // onClick={}
          >
            {/* {adding?"adding..." : "Add"} */}
            book
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

            <button
              className="px-12 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton mb-10"
              type="submit"

            >
              {updateButton ? "updating..." : "Update"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ViewCard;
