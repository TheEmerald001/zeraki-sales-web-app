import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loggedInUserRef: null,
    accessToken: null,
  },
  reducers: {
    setLoggedInUserRef: (state, action) => {
      const { loggedInUserRef } = action.payload;
      state.loggedInUserRef = loggedInUserRef;
    },

    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
  },
  // extraReducers: {},
});

export const { setLoggedInUserRef, setAccessToken } = userSlice.actions;

export const selectLoggedInUserRef = (state) => state?.user?.loggedInUserRef;
export const selectAccessToken = (state) => state?.user?.accessToken;
export default userSlice.reducer;
