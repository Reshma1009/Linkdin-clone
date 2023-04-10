import React, { useEffect, useState, useMemo } from "react";
import HomeComponents from "../components/HomeComponents";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";
import { getCurrentUser } from "../slices/userSlices";
const Home = () => {
  const auth = getAuth();
  const db = getDatabase();
  let dispatch = useDispatch();
  let data = useSelector((state) => state.allUserInfo.userInfo);
  // console.log(data);
  let navigate = useNavigate();
  const [verify, setVerify] = useState(true);

/*   useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user.emailVerified) {
        // console.log(user);
        // ...setVerify
        setVerify(true);
      } else {
        console.log("No user Found");
      }
    });
  }, []); */
  useEffect(() => {
    if (!data) {
      navigate("/login");
    }
  }, []);

  const [users, setUsers] = useState({});
  useEffect(() => {
    const usersRef = ref(db, "users/");
    onValue(usersRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        // console.log(item.val());
        if (auth.currentUser.uid == item.key) {
          arr.push({ ...item.val(), userId: item.key });
        }
      });
      setUsers(arr[0]);
    });
  }, [] );
  console.log("users", users);

  return (
    <div>
      {verify ? (
        <HomeComponents users={users} />
      ) : (
        <h1>Please veryFi Your Email</h1>
      )}
    </div>
  );
};

export default Home;
