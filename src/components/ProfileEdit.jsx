import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  update,
  onValue,
  off,
} from "firebase/database";
import {
  getAuth,
  updateProfile,
  updateEmail,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";

import { userInformaton } from "../slices/userSlices";
import { GrClose } from "react-icons/gr";
const ProfileEdit = ({ sendData }) => {
  const db = getDatabase();
  const auth = getAuth();
  let dispatch = useDispatch();
  console.log(sendData);
  let data = useSelector((state) => state.allUserInfo.userInfo);
  let datapass = useSelector((state) => state.allUserInfo.userPass);
  const [showEdit, setShowEdit] = useState(false);
  const [inputValus, setInputValus] = useState({
    username: sendData.username,
    headline: sendData.headline,
    location: sendData.location,
    college: sendData.college,
    city: sendData.city,
    website: sendData.website,
    email: sendData.email,
  });
  let updateInputs = (e) => {
    let { name, value } = e.target;

    let inputs = { [name]: value };
    setInputValus({ ...inputValus, ...inputs });
  };
  // get posts
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    // Create a query to find all posts by the current user
    const postsQuery = query(
      ref(db, "posts"),
      orderByChild("userId"),
      equalTo(auth.currentUser.uid)
    );

    // Set up a listener for the posts query
    const postsListener = onValue(postsQuery, (snapshot) => {
      const postsData = [];
      snapshot.forEach((childSnapshot) => {
        const postId = childSnapshot.key;
        const postData = childSnapshot.val();
        postsData.push({ id: postId, ...postData });
      });
      setPosts(postsData);
    });

    // Return a cleanup function to detach the listener when the component unmounts
    return () => {
      off(postsQuery, "value", postsListener);
    };
  }, [db, auth.currentUser]);
  console.log("posts", posts);
  let handleUpdateProfile = async () => {


    update(ref(db, "users/" + auth.currentUser.uid), inputValus);
    const updatedPosts = posts.map((post) => {
      return {
        [`/posts/${post.id}/username`]: inputValus.username,
      };
    });
    console.log("updatedPosts", updatedPosts);
    update(ref(db), Object.assign({}, ...updatedPosts));
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      datapass
    );
     updateProfile(auth.currentUser, {
      displayName: inputValus.username,
      email: inputValus.email,
    })
      .then(async () => {
        dispatch(userInformaton(auth.currentUser));
        localStorage.setItem("userInfo", JSON.stringify(auth.currentUser));

        await reauthenticateWithCredential(auth.currentUser, credential).then(
          () => {
            updateEmail(auth.currentUser, inputValus.email)
              .then(() => {
                console.log("Email updated!");
                update(ref(db, "users/" + data.uid), inputValus);
              })
              .catch((error) => {
                console.log("Up email error", error);
              });
          }
        );
        // onEdit();
      })
      .catch((error) => {
        console.log("Profile error", error);
      }); 

    // post update
    // Update the user's info in all their posts
    /* const updatedPosts = posts.map((post) => {
      return {
        [ `/posts/${ post.id }/username` ]: inputValus.username,

      };
    } );
    console.log("updatedPosts", updatedPosts);
    update(ref(db), ...updatedPosts); */
  };

  return (
    <>
      <div className="mt-20">
        <div className="w-[80%] bg-slate-100 mx-auto p-5 rounded-xl flex justify-between">
          <div className="w-[70%]">
            <div className="w-full">
              <p className="mb-3">Name</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="Name"
                name="username"
                value={inputValus.username}
                defaultValue={inputValus.username}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">Email</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="Email"
                name="email"
                value={inputValus.email}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">Headline</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="Headline"
                name="headline"
                value={inputValus.headline}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">Location</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="Location"
                name="location"
                value={inputValus.location}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">College</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="College"
                name="college"
                value={inputValus.college}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">City</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="City"
                name="city"
                value={inputValus.city}
              />
            </div>
            <div className="w-full">
              <p className="mb-3">Website</p>
              <input
                onChange={updateInputs}
                className="border-2 border-solid border-sec/30 font-nunito font-semibold text-base rounded-lg w-full pl-2 py-3 max-sm:py-4 max-sm:pl-2 text-sec outline-none mb-10"
                type="text"
                placeholder="Website"
                name="website"
                value={inputValus.website}
              />
            </div>
            <button
              onClick={handleUpdateProfile}
              className=" sm:max-md:mb-5 max-sm:py-4 bg-primary text-white text-xl font-nunito font-semibold w-full py-5 rounded-full"
            >
              Update
            </button>
          </div>
          <div>
            <button className="hover:bg-white p-5 rounded-full">
              <GrClose className="text-2xl" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileEdit;
