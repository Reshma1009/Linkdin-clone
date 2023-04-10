import React, { useState, useEffect } from "react";
import user from "../assets/user.png";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
import PostCard from "./PostCard";
import moment from "moment";
import { useSelector } from "react-redux";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  orderByValue,
  orderByChild,
  query,
} from "firebase/database";
const PostUpdates = ({ users }) => {
  const db = getDatabase();
  let data = useSelector((state) => state.allUserInfo.userInfo);
console.log(users);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [postStatus, setPostStatus] = useState([]);
  // const [ poststatus, setPostStatus ] = useState( [] );
  const getTime = moment().format("LLL");

  let sendPostStatus = () => {
    set(push(ref(db, "posts/")), {
      userId: users.userId,
      username: users.username,
      email: users.email,
      posts: status,
      profilePic: data.photoURL,
      timeStamp: getTime,
    }).then(() => {
      setModalOpen(false);
      setStatus("");
    });
  };
  /* query(ref(db, 'user-posts/' + myUserId), orderByChild('starCount')); */
  useEffect(() => {
    const postRef = ref(db, "posts/");
    // const postRef = query(ref(db, "posts/"), orderByChild("timeStamp"));
    onValue(postRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        console.log("posts",item.val());
        arr.push({ ...item.val(), postId: item.key });
      });
      setPostStatus(arr);
    });
  }, []);

  return (
    <div className="w-[85%] mx-auto ">
      <ToastContainer />
      <div className="p-5 flex gap-x-5 items-center w-[50%] bg-slate-100 mt-10">
        <div className="w-[30px]">
          <img src={user} alt="" />
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className=" border border-solid border-blue-300 w-full py-4 text-left px-4 rounded-full text-sm"
        >
          Start a post
        </button>
        <Modal
          modalOpen={modalOpen}
          setModalOpen={setModalOpen}
          setStatus={setStatus}
          status={status}
          sendPostStatus={sendPostStatus}
        />
      </div>
      <div>
        {postStatus.map((item) => (
          <PostCard item={item} users={users} />
        ))}
      </div>
    </div>
  );
};

export default PostUpdates;
