import React from "react";
import "../index.css"

function Signup() {
  return (
    <div className="w-[100vw] h-[100vh] flex item-center justify-center ">
      <form
        action=""
        className="max-w-[900px] w-[90%] h-[600px] flex item-center justify-center flex-col md:item-start gap-[15px]"
      >
        <h1 className="text-[30px] text-[black] mb-[30px]">Welcome to nivaasSthan</h1>
        <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
          <label htmlFor="name" className="text-[20px] ">User Name</label>
          <input type="text" id="name" className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"/>
        </div>
        <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
          <label htmlFor="email" className="text-[20px] ">Email</label>
          <input type="email" id="email" className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"/>
        </div>
        <div className="w-[90%] flex item-start justify-start flex-col gap-[10px]">
          <label htmlFor="password" className="text-[20px] ">Password</label>
          <input type="password" id="password" className="w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px]"/>
        </div>

        <button className="px-12 py-2 mt-6 bg-cyan-400 text-white md:px-24 rounded-lg hover:bg-cyan-500 transition duration-300 w-[40%] signupButton">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
