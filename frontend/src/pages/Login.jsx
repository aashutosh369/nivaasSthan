import React, { useState, useContext } from "react";
import { TbEyeCheck } from "react-icons/tb";
import { TbEyeCancel } from "react-icons/tb";
import { TiArrowBack } from "react-icons/ti";
import { BsEmojiSmile } from "react-icons/bs";
import { PiSmileySadThin } from "react-icons/pi";
import { authDataContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../Context/UserContext";

function Login() {
  let navigate = useNavigate();
  let [showText, setShowText] = useState(false);
  let {userData, setUserData} = useContext(userDataContext)
  let [email, setEmail] = useState("");
  let [login,setLogin] = useState(false)
  let [password, setPassword] = useState("");
  let [alert, setAlert] = useState({ type: "", massage: "" });

  const { serverUrl } = useContext(authDataContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    // console.log("handleLogin is called!");
    // console.log({ email, password });
    try {
      setLogin(true)
      let loginData = await axios.post(
        serverUrl + "api/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setUserData(loginData.data.user)
      navigate("/")
      setLogin(false)
      console.log(`Login Successfull!`);
      console.log(loginData);
      if (loginData.status === 201 || loginData.status === 200) {
        setAlert({
          type: "Success",
          // massage: `Welcome ${loginData.data.user.name}!`,
          massage: (
            <>
              Welcome {loginData.data.user.name}{" "}
              <BsEmojiSmile className="inline-block ml-1 mb-1 text-[20px]" />
            </>
          ),
        });
        // navigate("/")
      } else {
        setAlert({ type: "error", massage: "Login Failed" });
      }
      setTimeout(() => {
        setAlert({ type: "", massage: "" });
      }, 5000);
    } catch (error) {
      console.log(`Frontend Axios error ${error}`);
      setAlert({
        type: "error",
        massage: (
          <>
            Server Error! 
            <PiSmileySadThin className="inline-block ml-1 mb-1 text-[20px]" />
          </>
        ),
      });
      setTimeout(() => {
        setAlert({ type: "", massage: "" });
      }, 5000);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex item-center justify-center">
      <div className="back">
        <TiArrowBack
          className="h-[30px] w-[30px] absolute left-[2%] top-[2%] cursor-pointer text-[orange]"
          onClick={() => navigate("/")}
        />
      </div>

      {/* alert div */}
      {alert.massage && (
        <div
          className={`p-3 mb-4 mt-2 text-sm font-medium rounded-lg shadow-md h-[40px] absolute ${
            alert.type === "Success"
              ? "text-green-800 bg-green-100 border border-green-300"
              : "text-red-800 bg-red-100 border border-red-300"
          }`}
          role="alert"
        >
          {alert.massage}
        </div>
      )}

      <form
        action=""
        onSubmit={handleLogin}
        className="max-w-[900px] w-[90%] h-[600px] flex item-center justify-center flex-col md:item-start gap-[15px]"
      >
        <h1 className="text-[30px] text-[black] mb-[30px]">
          Welcome to nivaasSthan
        </h1>

        <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
          <label htmlFor="email" className="text-[20px] ">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
          />
        </div>
        <div className="w-[90%] flex item-start justify-start flex-col gap-[10px] relative">
          <label htmlFor="password" className="text-[20px] ">
            Password
          </label>
          <input
            type={showText ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
          />
          {showText && (
            <TbEyeCheck
              className="w-[22px] h-[22px] absolute right-[12%] my-[48px] cursor-pointer"
              onClick={() => setShowText((prev) => !prev)}
            ></TbEyeCheck>
          )}
          {!showText && (
            <TbEyeCancel
              className="w-[22px] h-[22px] absolute right-[12%] my-[48px] cursor-pointer"
              onClick={() => setShowText((prev) => !prev)}
            ></TbEyeCancel>
          )}
        </div>

        <button
          className="px-12 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton"
          type="submit"
          disabled={login == true}
        >
          {login ? "proccessing" : "Login"}
        </button>
        <p className="text-[16px] my-3 mx-9">
          Don't have an account ?{" "}
          <span
            className="text-[#0ABAB5] underline cursor-pointer text-[18px]"
            onClick={() => navigate("/signup")}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
