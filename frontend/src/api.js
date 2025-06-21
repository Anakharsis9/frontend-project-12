import axios from "axios";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { io } from "socket.io-client";

export const apiInstance = axios.create({});
export const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers, { getState }) => {
    // @ts-ignore
    const user = getState().auth.user;
    if (user?.token) {
      headers.set("Authorization", `Bearer ${user.token}`);
    }
    return headers;
  },
});
export const makeSocketClient = () =>
  io({
    path: "/socket.io",
    transports: ["websocket"],
    autoConnect: true,
    reconnection: true,
  });
