import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
// import { userDataContext } from "./UserContext";

export const listingDataContext = createContext();

function ListingContext({ children }) {
  let navigate = useNavigate();
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [frontendImage1, setFrontendImage1] = useState(null);
  let [frontendImage2, setFrontendImage2] = useState(null);
  let [frontendImage3, setFrontendImage3] = useState(null);
  let [backendImage1, setBackendImage1] = useState(null);
  let [backendImage2, setBackendImage2] = useState(null);
  let [backendImage3, setBackendImage3] = useState(null);
  let [rent, setRent] = useState("");
  let [city, setCity] = useState("");
  let [landmark, setLandmark] = useState("");
  let [category, setCategory] = useState("");
  // let [ratings, setRatings] = useState(0);
  let { serverUrl } = useContext(authDataContext);
  let [adding, setAdding] = useState(false);
  let [listingData, setListingData] = useState([]);
  let [originalListingData, setOriginalListingData] = useState([]);
  let [cardDetails, setCardDetails] = useState(null);
  let [updateButton, setUpdateButton] = useState(false);
  let [deleteing, setDeleteing] = useState(false);
  // let {userData} = useContext(userDataContext);

  const handleAddListing = async () => {
    try {
      let formData = new FormData();
      formData.append("title", title);
      formData.append("image1", backendImage1);
      formData.append("image2", backendImage2);
      formData.append("image3", backendImage3);
      formData.append("description", description);
      formData.append("rent", rent);
      formData.append("city", city);
      formData.append("landmark", landmark);
      formData.append("category", category);
      setAdding(true);

      let result = await axios.post(serverUrl + "api/listing/add", formData, {
        withCredentials: true,
      });
      console.log(result);
      navigate("/");
      setTitle("");
      setBackendImage1(null);
      setBackendImage2(null);
      setBackendImage3(null);
      setDescription("");
      setRent();
      setCity("");
      setCategory("");
      setLandmark("");
      setAdding(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getListing = async () => {
    try {
      let result = await axios.get(serverUrl + "api/listing/get", {
        withCredentials: true,
      });
      setListingData(result.data);
      setOriginalListingData(result.data);
    } catch (error) {
      console.log(`Axios getListing error ${error}`);
    }
  };

  useEffect(() => {
    getListing();
  }, [adding, updateButton, deleteing]);

  const handleViewCard = async (id) => {
    try {
      let result = await axios.get(
        serverUrl + `api/listing/findlistingbyid/${id}`,
        { withCredentials: true }
      );
      console.log(result);
      setCardDetails(result.data);

      console.log(cardDetails);
      navigate(`/viewcard/${id}`);
      // console.log(userData);
    } catch (error) {
      console.log(`handleViewCard error ${error}`);
    }
  };

  let value = {
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
    setAdding,
    listingData,
    setListingData,
    getListing,
    originalListingData,
    setOriginalListingData,
    handleViewCard,
    cardDetails,
    setCardDetails,
    updateButton,
    setUpdateButton,
    deleteing,
    setDeleteing,
    // ratings,
    // setRatings,
  };

  return (
    <div>
      <listingDataContext.Provider value={value}>
        {children}
      </listingDataContext.Provider>
    </div>
  );
}

export default ListingContext;
