import React, { useState } from "react";
import InputBox from "./InputBox";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { getDatabase, ref, set } from "firebase/database";
import { userInformaton, getPass } from "../slices/userSlices";
const RegistationComponents = () => {
  const auth = getAuth();
  const db = getDatabase();
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullNameError, setFullNameError] = useState("");
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
    setFullName(e.target.value);
    setFullNameError("");
  };
  let handleSubmit = async () => {
    if (!fullName) {
      setFullNameError("Full Name is requried");
    }
    if (!email) {
      setEmailError("Email is requried");
    }
    if (!password) {
      setPasswordError("password is requried");
    }
    if (fullName && email && password) {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          let user = userCredential.user;

          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              toast.success("Registation Successfull!");
              setFullName("");
              setEmail("");
              setPassword("");
              sendEmailVerification(auth.currentUser);
              dispatch(userInformaton(user));
              localStorage.setItem("userInfo", JSON.stringify(user));
              setInterval(() => {
                navigate("/login");
              }, 2500);
              setLoading(false);
            })
            .then(() => {
              console.log("ami user");
              set(ref(db, "users/" + user.uid), {
                username: user.displayName,
                email: user.email,
                profile_picture: user.photoURL,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          const errorMessage = error.message;
          if (errorMessage.includes("auth/email-already-in-use")) {
            setEmailError("email already exits");
          }
          setLoading(false);
        });
    }
  };
  let goToSingIn = () => {
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center  max-sm:mx-5 max-sm:mt-10 sm:max-md:mt-[150px] h-screen">
      <ToastContainer />
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
          type="text"
          label="Full name"
          onChange={handleFullname}
          value={fullName}
        />
        {fullNameError && (
          <p className="bg-red-600 text-white mb-6 p-2.5 -mt-3">
            {fullNameError}
          </p>
        )}{" "}
        <InputBox
          type="email"
          label="Email Address"
          onChange={handleEmail}
          value={email}
        />
        {emailError && (
          <p className="bg-red-600 text-white mb-6 p-2.5 -mt-3">{emailError}</p>
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
            Sign Up
          </button>
        )}
        <p className="text-center my-5">
          Already Have An Account ?{" "}
          <span
            onClick={goToSingIn}
            className="text-primary font-bold font-nunito "
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegistationComponents;
