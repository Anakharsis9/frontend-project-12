import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import channelsSlice from "./features/channelsSlice";
import messagesSlice from "./features/messagesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    channels: channelsSlice,
    messages: messagesSlice,
  },
});
