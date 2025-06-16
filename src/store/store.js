import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import spinnerReducer from "./redux/spinnerSlice";

const loginJson = localStorage.getItem("user");

const preloadedState = {
  user: {
    loginData: loginJson ? JSON.parse(loginJson) : null,
  },
};

const store = configureStore({
  reducer: {
    user: userReducer,
    spinnerSlice: spinnerReducer,
  },
  devTools: true,
  preloadedState,
});

export default store;
