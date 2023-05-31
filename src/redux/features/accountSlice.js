import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: null,
    currentUser: null,
  },
  reducers: {
    setAccount: (state, action) => {
      // console.log(action.payload)
      if (action.payload === null) {
        localStorage.removeItem("actkn");
      } else {
        if (action.payload.token)
          localStorage.setItem("actkn", action.payload.token);
        // state.account = action.payload.user
      }
      state.account = action.payload.user;
    },
    setCurrentUser : (state,action) => {
      console.log(action.payload)
      state.currentUser = action.payload
    } 
  },

});

export const { setAccount,setCurrentUser } = accountSlice.actions;

export default accountSlice.reducer;
