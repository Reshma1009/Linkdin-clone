import React, { useState } from "react";

import PostUpdates from "./PostUpdates";
import PostCard from "./PostCard";

const HomeComponents = ({ users }) => {
  return (
    <>
      <PostUpdates users={users} />
    </>
  );
};

export default HomeComponents;
