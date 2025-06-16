import { createSlice } from "@reduxjs/toolkit";

const loginJson = localStorage.getItem("user");
const initialState = {
  loginData: loginJson ? JSON.parse(loginJson) : null || null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loginData = action.payload;
    },
    clearUser: (state) => {
      state.loginData = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
