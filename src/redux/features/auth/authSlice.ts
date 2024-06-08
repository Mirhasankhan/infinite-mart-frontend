import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TAuthState = {
  email: null | object;
  role: null | string;
  token: null | string;
};

const initialState: TAuthState = {
  email: null,
  role: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const { email, token, role } = action.payload;
      state.email = email;
      state.role = role;
      state.token = token;
    },
    logOut: (state) => {
      (state.email = null), (state.token = null), (state.role = null);
    },
  },
});

export const { setUser, logOut } = authSlice.actions;
export default authSlice.reducer;

export const useCurrentUser = (state: RootState) => state.auth;
export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentRole = (state: RootState) => state.auth.role;
