import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/api";

let initialState = {
  user: null,
  loading: false,
  loginError: null,
  registerError: null,
};

export const registerUser = createAsyncThunk(
  "/user/registerUser",
  async ({ email, password, name, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user", { email, password, name });
      navigate("/login");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const logout = () => (dispatch) => {
  dispatch(logoutSuccess());
};

export const loginWithToken = createAsyncThunk(
  "/user/loginWithToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/user/me");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const loginWithEmail = createAsyncThunk(
  "/user/loginWithEmail",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("/user/login", { email, password });
      if (response.status === 200) {
        sessionStorage.setItem("token", response.data.token); //세션스토리지에 토큰 값 저장
        return response.data;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//인증관련 슬라이스
const authenticateSlice = createSlice({
  name: "authenticate",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.loginError = null;
      state.registerError = null;
    },
    logoutSuccess: (state) => {
      //로그아웃 시 초기화
      state.user = null;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.registerError = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.registerError = action.payload;
      })
      .addCase(loginWithEmail.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
      })
      .addCase(loginWithEmail.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      })
      .addCase(loginWithToken.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.loginError = null;
      })
      .addCase(loginWithToken.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload;
      });
  },
});

export const { clearErrors, logoutSuccess } = authenticateSlice.actions;
export default authenticateSlice.reducer;
