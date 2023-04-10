import React, { useEffect, useState } from "react";
import profile from "../assets/profile.jpg";
import cover from "../assets/cover.png";
import PostCard from "./PostCard";
import { useSelector } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import { GrEdit, GrFormUpload } from "react-icons/gr";
import { MdCloudUpload } from "react-icons/md";
import ProfileEdit from "../components/ProfileEdit";
const ProfileComponents = ({ }) => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserInfo.userInfo);
  const [userList, setUserList] = useState([]);
  const [postStatus, setPostStatus] = useState([]);
  const [dataSend, setDataSend] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  /*  let onEdit = () => {
     setShowEdit(!showEdit);
   }; */
  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.key) {
          arr.push({ ...item.val(), userId: item.key });
        }
      });
      setUserList(arr);
    });
  }, [] );
  console.log(dataSend);
  // Only Login users Post
  useEffect(() => {
    const postRef = ref(db, "posts/");
    onValue(postRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().userId) {
          arr.push({ ...item.val(), postId: item.key });
        }
      });
      setPostStatus(arr);
    });
  }, []);
  let uploadProfilePic = () => {
    console.log("uplaod pic");
  };
  return (
    <>
      {showEdit ? (
        <ProfileEdit sendData={dataSend} />
      ) : (
        <div className="mt-20">
          {/* Profile info */}
          <div className="w-[80%] bg-slate-100 mx-auto rounded-xl">
            <div className="relative">
              <div className="w-full ">
                <img className="w-full h-[350px]" src={cover} alt="" />
              </div>
              <div className="absolute top-2 right-2">
                <button
                  // onClick={onEdit}
                  className="hover:bg-white p-8 rounded-full"
                >
                  <GrEdit className="text-2xl" />
                </button>
              </div>
            </div>
            <div className="relative">
              {userList.map((item) => (
                <div className=" p-5">
                  <div className="-mt-[135px] flex justify-center  relative group h-[200px] w-[200px] ">
                    <img
                      src={profile}
                      alt="profile"
                      className="rounded-full w-full h-full  object-cover "
                    />
                    <div
                      onClick={uploadProfilePic}
                      className="cursor-pointer bg-[rgba(0,0,0,.4)] absolute flex justify-center items-center w-full h-full rounded-full opacity-0 group-hover:opacity-100"
                    >
                      <MdCloudUpload className="text-4xl text-white" />
                    </div>
                  </div>
                  <div className="mt-5">
                    <h2 className="font-bold capitalize text-2xl text-[#212121]">
                      {item.username}
                    </h2>
                    <p>{item.headline}</p>
                    <p> {item.email}</p>
                    <p>{item.location}</p>
                    <p>{item.city}</p>
                    <p>{item.college}</p>

                    <p>{item.website}</p>
                  </div>
                  <div className="absolute top-5 right-0">
                    <button
                      onClick={() => {
                        setDataSend(item);
                        setShowEdit( true );
                        console.log(dataSend);
                      }}
                      className="hover:bg-white p-5 rounded-full"
                    >
                      <GrEdit className="text-2xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Only login users post */}
          <div className="w-[80%] mx-auto rounded-xl">
            <h2 className="mt-8 font-bold text-3xl border-b border-solid border-black">
              Your Posts
            </h2>
            {postStatus.map((item) => (
              <PostCard key={item.postId} item={item} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileComponents;
