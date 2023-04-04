import React, { useEffect, useState } from "react";
import InputBox from "../components/InputBox";
import { ColorRing } from "react-loader-spinner";
import { ResetEmailAuthintacation } from "../api/Auth";
import { auth } from "../firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const ForgetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  let handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };
  let handleSubmit = () => {
    let res = ResetEmailAuthintacation(email);
    res.then(() => {
      toast.success( "Verification link send. Check your Email" );
      setEmail("")
    });
  };

  return (
    <div className=" flex justify-center items-center h-screen max-sm:mx-5 max-sm:mt-10 sm:max-md:mt-[150px]">
      <ToastContainer />
      <div className="w-[500px] lg:max-xl:pb-5 lg:max-xl:mt-16">
        <div className="text-center sm:max-md:mt-10">
          <img className="mx-auto" imgsrc="assets/logo.png" />
        </div>
        <div className=" lg:max-xl:mt-5 lg:max-xl:mb-10 mb-16 max-sm:mb-6 max-sm:mt-6 text-center mt-11 sm:max-md:my-5 sm:max-md:mb-8">
          <h2 className=" lg:max-xl:mt-5 font-bold font-nunito text-sec text-[34px] max-sm:text-3xl">
            Reset Your Password
          </h2>
        </div>
        <InputBox
          type="email"
          label="Email Address"
          onChange={handleEmail}
          value={email}
        />
        {emailError && (
          <p className="bg-red-600 text-white mb-6 p-2.5 -mt-3">{emailError}</p>
        )}

        {loading ? (
          <button className=" flex justify-center items-center sm:max-md:mb-5 max-sm:py-4 bg-primary text-white text-xl font-nunito font-semibold w-full rounded-full">
            <ColorRing
              visible={true}
              height="70"
              width="80"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className=" sm:max-md:mb-5 max-sm:py-4 bg-primary text-white text-xl font-nunito font-semibold w-full py-5 rounded-full"
          >
            Reset Email
          </button>
        )}
        <p className="text-center my-5">
          Remember Password ?
          <Link to="/" className="text-primary font-bold font-nunito ">
            Back To Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
