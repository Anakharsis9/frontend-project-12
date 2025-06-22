import { baseQuery } from "@/api";
import { profanity } from "@/profanity";
import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

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

export const selectUser = (state) => state.auth.user;

export const { login, logout } = authSlice.actions;

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["auth"],
  baseQuery,
  endpoints: (build) => ({
    login: build.mutation({
      query: ({ username, password }) => ({
        url: "/v1/login",
        method: "POST",
        body: {
          username,
          password,
        },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        dispatch(login(data));
      },
    }),
    signup: build.mutation({
      query: ({ username, password }) => ({
        url: "/v1/signup",
        method: "POST",
        body: {
          username: profanity.censor(username),
          password,
        },
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        const { data } = await queryFulfilled;
        dispatch(login(data));
      },
    }),
  }),
});

export const { useLoginMutation, useSignupMutation } = authApi;

export default {
  auth: authSlice.reducer,
  [authApi.reducerPath]: authApi.reducer,
};
