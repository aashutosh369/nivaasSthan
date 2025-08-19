import React, { useContext, useState } from "react";
import { TbEyeCheck } from "react-icons/tb";
import { TbEyeCancel } from "react-icons/tb";
import { TiArrowBack } from "react-icons/ti";
import { authDataContext } from "../Context/AuthContext.jsx"; //authDataContext
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../Context/UserContext.jsx";

function SignUp() {
  let navigate = useNavigate();
  let [showText, setShowText] = useState(false);
  let { serverUrl } = useContext(authDataContext); //authDataContext
  let {userData, setUserData} = useContext(userDataContext)
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [signupButton, setSignupButton] = useState(false);

  let [alert, setAlert] = useState({ type: "", massage: "" }); // show alert

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("You clicked the button!");
    console.log({ name, email, password });
    try {
      setSignupButton(true);

      let signUpData = await axios.post(
        serverUrl + "api/auth/signup/",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
        { withCredentials: true }
      );
      setSignupButton(false);

      setUserData(result.data)
      if (signUpData.status === 200 || signUpData.status === 201) {
        setAlert({
          type: "Success",
          massage: `${signUpData.data.name}'s account created Successfuly!`,
        });
        navigate("/")
      } else {
        setAlert({ type: "error", massage: "Registration Failed!" });
      }
      // clear alert after 5 seconds
      setTimeout(() => {
        setAlert({ type: "", massage: "" });
      }, 5000);

      console.log(signUpData);
    } catch (error) {
      console.log(`Frontend Axios error! ${error}`);
      setAlert({
        type: "error",
        massage: "ServerError. Please try again later!",
      });

      setTimeout(() => {
        setAlert({ type: "", massage: "" });
      },5000);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex item-center justify-center relative">
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
        onSubmit={handleSubmit}
        className="max-w-[900px] w-[90%] h-[600px] flex item-center justify-center flex-col md:item-start gap-[15px]"
      >
        <h1 className="text-[30px] text-[black] mb-[30px]">
          Welcome to nivaasSthan
        </h1>

        <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
          <label htmlFor="name" className="text-[20px] ">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"
          />
        </div>

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
        >
          {signupButton ? "proccessing" : "Signup"}
        </button>
        <p className="text-[16px] my-3 mx-9">
          Don't have an account ?{" "}
          <span
            className="text-[#0ABAB5] underline cursor-pointer text-[18px]"
            onClick={() => navigate("/login")}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
