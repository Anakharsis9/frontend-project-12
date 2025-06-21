import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import authReducer, { authApi } from "./features/authSlice";
import channelsSlice, { channelsApi } from "./features/channelsSlice";
import messagesSlice, { messagesApi } from "./features/messagesSlice";

export const store = configureStore({
  reducer: {
    ...authReducer,
    ...channelsSlice,
    ...messagesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      channelsApi.middleware,
      messagesApi.middleware
    ),
});

setupListeners(store.dispatch);
