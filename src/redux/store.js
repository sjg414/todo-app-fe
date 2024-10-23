import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "./reducer/authenticateReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  //로그인 reducer
  auth: authenticateReducer,
});

//새로고침 시 store가 초기화가 되는 걸 방지하기 위해 redux-persist 사용(새로고침이 되어도 로컬스토리지에 값을 저장하므로 store가 유지된다.)
const persistConfig = {
  key: "root",
  storage,
  whiteList: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
