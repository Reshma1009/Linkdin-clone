import React, { useState } from "react";
import InputBox from "./InputBox";

const RegistationComponents = () => {

  // const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [textError, setTextError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };
  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  let handleFullname = (e) => {
    setText(e.target.value);
    setTextError("");
  };


  return (
    <div className="">

      <div className="flex justify-center items-center  max-sm:mx-5 max-sm:mt-10 sm:max-md:mt-[150px] h-screen">
        <div className="w-[500px] lg:max-xl:pb-5 lg:max-xl:mt-16">
          <div className="text-center sm:max-md:mt-10">
            <img className="mx-auto" imgsrc="assets/logo.png" />
          </div>
          <div className=" lg:max-xl:mt-5 lg:max-xl:mb-10 mb-16 max-sm:mb-6 max-sm:mt-6 text-center mt-11 sm:max-md:my-5 sm:max-md:mb-8">
            <h2 className=" lg:max-xl:mt-5 font-bold font-nunito text-sec text-[34px] max-sm:text-3xl">
              Get started with easily register
            </h2>
            <p className="font-normal font-nunito text-sec/50 text-xl max-sm:text-base max-sm:mt-3">
              Free register and you can enjoy it
            </p>
          </div>
          <InputBox
            type="email"
            label="Email Address"
            onChange={handleEmail}
            value={email}
          />
          {emailError && (
            <p className="bg-red-600 text-white mb-6 p-2.5 -mt-3">
              {emailError}
            </p>
          )}
          <InputBox
            type="text"
            label="Full name"
            onChange={handleFullname}
            name="email"
            value={text}
          />
          {textError && (
            <p className="bg-red-600 text-white mb-6 p-2.5 -mt-3">
              {textError}
            </p>
          )}
          <InputBox
            type="text"
            label="Password"
            onChange={handlePassword}
            value={password}
          />
          {passwordError && (
            <p className="bg-red-600 text-white mb-6 -mt-3 p-2.5">
              {passwordError}
            </p>
          )}


            <button
              // onClick={handleSubmit}
              className=" sm:max-md:mb-5 max-sm:py-4 bg-primary text-white text-xl font-nunito font-semibold w-full py-5 rounded-full"
            >
              Sign Up
            </button>


          <p className="text-center my-5">
            Already Have An Account ?{" "}
            <span to="/" className="text-primary font-bold font-nunito ">
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistationComponents;
