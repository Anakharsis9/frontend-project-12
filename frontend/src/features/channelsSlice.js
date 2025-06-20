import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  activeChannelId: null,
};

export const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    loadChannels: (state, action) => {
      state.data = action.payload;
      state.activeChannelId = action.payload[0]?.id ?? null;
    },
    switchActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
  },
});

export const { loadChannels, switchActiveChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
