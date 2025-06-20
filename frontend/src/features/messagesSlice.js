import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    loadMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { loadMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
