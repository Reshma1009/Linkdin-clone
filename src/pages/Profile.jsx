import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProfileComponents from "../components/ProfileComponents";
const Profile = () => {
  let data = useSelector((state) => state.allUserInfo.userInfo);
  // console.log(data);
  const [showData, setshowData] = useState(data);

  let navigate = useNavigate();

  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {showData && (
        <div>



            <ProfileComponents  />

        </div>
      )}
    </>
  );
};

export default Profile;
