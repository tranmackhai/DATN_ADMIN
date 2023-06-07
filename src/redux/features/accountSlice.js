import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    currentAccount: null,
    isFinishGetProfile: false,
  },
  reducers: {
    setAccount: (state, action) => {
      if (!action.payload) {
        state.account = null;
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.accessToken) {
          localStorage.setItem("actkn", action.payload.accessToken);
        }
        state.account = action.payload.user;
        state.isFinishGetProfile = true;
      }
    },
    setCurrentUser: (state, action) => {
      state.currentAccount = action.payload;
    },
    setProfile: (state, action) => {
      state.account = action.payload;
    },
    setIsFinishGetProfile: (state, action) => {
      state.isFinishGetProfile = action.payload;
    },
  },
});

export const { setAccount, setCurrentUser, setProfile, setIsFinishGetProfile } =
  accountSlice.actions;

export default accountSlice.reducer;
