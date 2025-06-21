import { createSlice, createSelector } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const initialState = {
  activeChannelId: null,
};

export const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    switchActiveChannel: (state, action) => {
      state.activeChannelId = action.payload;
    },
  },
});

export const { switchActiveChannel } = channelsSlice.actions;

export const channelsApi = createApi({
  reducerPath: "channelsApi",
  tagTypes: ["channels"],
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const user = getState().auth.user;
      if (user?.token) {
        headers.set("Authorization", `Bearer ${user.token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    getChannels: build.query({
      query: () => ({
        url: "/v1/channels",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(switchActiveChannel(data[0].id));
        } catch (error) {
          console.error(error);
        }
      },
    }),
  }),
});

export const { useGetChannelsQuery } = channelsApi;

export const selectActiveChannelId = (state) => state.channels.activeChannelId;

export const selectChannels = (state) =>
  state.channelsApi.queries["getChannels(undefined)"]?.data ?? [];

export const selectActiveChannel = createSelector(
  [selectChannels, selectActiveChannelId],
  (channels, activeChannelId) => channels.find((c) => c.id === activeChannelId)
);

export default {
  channels: channelsSlice.reducer,
  [channelsApi.reducerPath]: channelsApi.reducer,
};
