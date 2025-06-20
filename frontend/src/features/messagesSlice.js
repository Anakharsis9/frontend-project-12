import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    loadMessages: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { loadMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
