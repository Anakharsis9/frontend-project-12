import { createSlice } from "@reduxjs/toolkit";

const userStorage = {
  read: () => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (error) {
      console.error(error);
    }
  },
  write: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  delete: () => localStorage.removeItem("user"),
};

const initialState = {
  user: userStorage.read(),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      userStorage.write(action.payload);
    },
    logout: (state) => {
      state.user = null;
      userStorage.delete();
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
