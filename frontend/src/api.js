import axios from "axios";
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiInstance = axios.create({});
export const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: (headers, { getState }) => {
    const user = getState().auth.user;
    if (user?.token) {
      headers.set("Authorization", `Bearer ${user.token}`);
    }
    return headers;
  },
});
