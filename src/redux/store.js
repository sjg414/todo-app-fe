import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authenticateReducer from "./reducer/authenticateReducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const reducers = combineReducers({
  auth: authenticateReducer,
});

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
