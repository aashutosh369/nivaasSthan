import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";
import { useEffect } from "react";
export const userDataContext = createContext();
function UserContext({ children }) {
  let { serverUrl } = useContext(authDataContext);
  let [userData, setUserData] = useState();
  const getCurrentUser = async () => {
    try {
      let response = await axios.get(
        serverUrl + "api/user/currentuser",
        { withCredentials: true }
        
      );
      setUserData(response.data)
    } catch (error) {
      setUserData(null);
      console.log("Frontend Axios error", error);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  let value = {
    userData,
    setUserData,
  };

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
