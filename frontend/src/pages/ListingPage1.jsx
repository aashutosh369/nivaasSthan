import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { listingDataContext } from "../Context/ListingContext";

function ListingPage1() {
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
  } = useContext(listingDataContext);

  const handleImage1 = (e)=>{
    let file = e.target.files[0];
    setBackendImage1(file);
    setFrontendImage1(URL.createObjectURL(file));
  }

  const handleImage2 =(e)=>{
    let file = e.target.files[0];
    setBackendImage2(file);
    setFrontendImage2(URL.createObjectURL(file))
  }
  const handleImage3 =(e)=>{
    let file = e.target.files[0];
    setBackendImage3(file);
    setFrontendImage3(URL.createObjectURL(file));
  }


  let navigate = useNavigate();

  let handlePage1 = ()=>{
    navigate("/listingpage2")
    console.log(title,description,rent,city,landmark,frontendImage1,frontendImage2,
      frontendImage3
    )
  }

  return (
    <div className="w-[100%] h-[100vh]  flex items-center justify-center overflow-auto">
      <div className="back">
        <TiArrowBack
          className="h-[30px] w-[30px] absolute left-[2%] top-[2%] cursor-pointer text-[orange]"
          onClick={() => navigate("/")}
        />
      </div>

      <form
        onSubmit={(e)=>{
          e.preventDefault()
        }}
        action=""
        className="max-w-[900px] w-[90%] h-[600px] flex item-center justify-start flex-col md:item-start gap-[15px] overflow-auto mt-[50px] "
      >
        <div className="w-[200px] h-[50px] text-[20px] bg-[#0ABAB5] text-white flex items-center justify-center rounded-[30px] absolute top-[15px] right-[10px] shadow-lg">
          SetUp your Home
        </div>

        <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
          <label htmlFor="title" className="text-[20px] ">
            Title
          </label>
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e)=>{setTitle(e.target.value)}}
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
            onChange={(e)=>{
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
              id="img1a"
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
            onChange={(e)=>{
              setRent(e.target.value)
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
            onChange={(e)=>{
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
            onChange={(e)=>{
              setLandmark(e.target.value);
            }}
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
          />
        </div>

        <button
          className="px-12 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton mb-10"
          type="submit"
          onClick={() => handlePage1()}
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default ListingPage1;
