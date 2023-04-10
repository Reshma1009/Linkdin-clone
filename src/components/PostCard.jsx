import React, { useEffect, useState } from "react";
import user from "../assets/user.png";
import { useSelector } from "react-redux";
const PostCard = ({ item }) => {
  let data = useSelector((state) => state.allUserInfo.userInfo);
  // console.log("data", data);
  return (
    <div>
      <div className="p-5 w-[50%]  bg-slate-100 mt-10">
        <div className="flex gap-x-5">
          <div className="w-[40px]">
            <img src={user} alt="" />
          </div>
          <div>
            <p>{item.username}</p>
            <p>{item.timeStamp}</p>
          </div>
        </div>
        <div className="pt-5 ml-10">
          <p>{item.posts}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
