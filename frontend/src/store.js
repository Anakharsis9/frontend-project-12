import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer from "./features/authSlice";
import channelsSlice, { channelsApi } from "./features/channelsSlice";
import messagesSlice from "./features/messagesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    messages: messagesSlice,
    ...channelsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(channelsApi.middleware),
});

setupListeners(store.dispatch);
