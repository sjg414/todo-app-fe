import { configureStore } from "@reduxjs/toolkit";
import authenticateSlice from "./reducer/authenticateSlice";

const store = configureStore({
  reducer: { auth: authenticateSlice },
});

export default store;
