import React, { useState } from "react";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import {
  AiOutlineHome,
  AiFillMessage,
  AiOutlineSearch,
  AiOutlineUserSwitch,
} from "react-icons/ai";

import { FaBriefcase } from "react-icons/fa";
import { GrNotification } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";
import { signOut,getAuth } from "firebase/auth";
import { useDispatch } from "react-redux";
import { userInformaton } from "../slices/userSlices";
const Topbar = () =>
{
  const auth= getAuth()
  let dispatch = useDispatch();
  const [dropDown, setDropDown] = useState(false);
  let navigate = useNavigate();
  let userInfo = () => {
    setDropDown(!dropDown);
  };
  let handleLogOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
        dispatch(userInformaton(null));
        localStorage.removeItem("userInfo");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className="bg-slate-100 flex items-center  px-10 py-3">
      <div className="w-[40%]">
        <img className="max-w-[37px]" src={logo} alt="logo" />
      </div>
      <div className="flex gap-x-8 items-center w-[60%]">
        <Link>
          <AiOutlineSearch
            className="text-gray-600 hover:text-black "
            size={32}
          />
        </Link>

        <Link to={`/`}>
          <AiOutlineHome
            size={32}
            className="text-gray-600 hover:text-black "
          />
        </Link>
        <Link to={"/profile"}>
          <AiOutlineUserSwitch
            size={32}
            className="text-gray-600 hover:text-black "
          />
        </Link>
        <Link to={`/message`}>
          <AiFillMessage
            size={32}
            className="text-gray-600 hover:text-black "
          />
        </Link>

        <Link>
          <FaBriefcase size={32} className="text-gray-600 hover:text-black " />
        </Link>
        <Link>
          <GrNotification
            size={32}
            className="text-gray-600 hover:text-black "
          />
        </Link>
        <div onClick={userInfo} className="cursor-pointer ml-auto relative">
          <div>
            <img
              src={user}
              className="text-gray-600 hover:text-black w-[37px]"
            />
          </div>
          {dropDown && (
            <div className="bg-slate-200 p-5 rounded-md w-[150px] absolute right-0 text-right">
              <p onClick={handleLogOut} className="mb-5">
                LogOut
              </p>
              <p>Profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
