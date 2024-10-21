import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState = {
  token: "",
  authenticate: false,
};

const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.token = action.payload.token;
      state.authenticate = true;
    },
    logoutSuccess(state, action) {
      state.token = "";
      state.authenticate = false;
    },
  },
});

export const authenticateActions = authenticateSlice.actions;
export default authenticateSlice.reducer;
