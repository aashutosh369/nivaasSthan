import React, { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";
import { useEffect } from "react";
export const userDataContext = createContext();// yaha pr ek userDataContext create kiaa ja rha hai , jiss se jaha pr v jarurat hoga logedin user data ka to wo use kar sakega 
function UserContext({ children }) {
  let { serverUrl } = useContext(authDataContext);// authDataContext pahle ek context create kiaa gya tha usss context se serverUrl liaa ja rha hai 
  let [userData, setUserData] = useState(); // ek state banaya gya hai jo userData ko update karega 
  const getCurrentUser = async () => { // getCurrentUser ek function banaya ja rha hai jiss se login user ka information liaa jayega 
    try {
      // axios ke through get request bhejega backend me cookie ke sath 
      let response = await axios.get(
        serverUrl + "api/user/currentuser", // api/user/currentuser pr request jayega to uss ke aage middleware v hai {isAuth} aur uss ke baad ek getCurrentUser name se ek controller v hai ye dono v chalenge jaise [pahle request jayega usske baad isAuth se userId aayega uss ke baad getCurrentUser se user ka details aayega]
        { withCredentials: true }
        
      );
      setUserData(response.data) // agar sabkucch sahi raha to db se jo userDetails aayenge wo response me aayega ab response.data jo hai uss ko setUserData ke through userData me daal diaa gya 
    } catch (error) {
      setUserData(null); // agar koi response nhii aaya to userData ko null kr diaa gya 
      console.log("Frontend Axios error", error);
    }
  };

  useEffect(() => { // website ke reload hone pr ke baar getCurrentUser ko run karega 
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
         {/* // userData aur setUserData ko ham kisi v component me use kr sakte hain userDataContext ke through */}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;
