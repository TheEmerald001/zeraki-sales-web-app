import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    accessToken: null,
  },
  reducers: {
    setCurrentUser: (state, action) => {
      const { currentUser } = action.payload;
      state.currentUser = currentUser;
    },

    setAccessToken: (state, action) => {
      const { accessToken } = action.payload;
      state.accessToken = accessToken;
    },
  },
  // extraReducers: {},
});

export const { setCurrentUser, setAccessToken } = userSlice.actions;

export const selectCurrentUser = (state) => state?.user?.currentUser;
export const selectAccessToken = (state) => state?.user?.accessToken;
export default userSlice.reducer;
