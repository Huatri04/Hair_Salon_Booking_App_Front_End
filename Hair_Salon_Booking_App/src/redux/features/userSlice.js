import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    login: (state, actions) => {
      state = actions.payload;
      return state;
    },
    updateProfile: (state, action) => {
      return { ...state, ...action.payload };
    },
    logout: () => {
      return null;
    },
  },
});
export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;     