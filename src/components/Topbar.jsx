import React from "react";
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
import { Link } from "react-router-dom";
const Topbar = () => {
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
        <div className="cursor-pointer ml-auto">
          <img src={user} className="text-gray-600 hover:text-black w-[37px]" />
        </div>
      </div>
    </div>
  );
};

export default Topbar;
