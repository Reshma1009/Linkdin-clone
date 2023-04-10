import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./slices/userSlices";
export const store = configureStore({
  reducer: {
    allUserInfo: usersSlice,
  },
});
