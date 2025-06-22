import { createSlice, createSelector } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, socket } from "@/api";
import { profanity } from "@/profanity";

export const selectActiveChannelId = (state) => state.channels.activeChannelId;

export const selectChannels = (state) =>
  state.channelsApi.queries["getChannels(undefined)"]?.data ?? [];

export const selectActiveChannel = createSelector(
  [selectChannels, selectActiveChannelId],
  (channels, activeChannelId) => channels.find((c) => c.id === activeChannelId)
);

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
  baseQuery,
  endpoints: (build) => ({
    getChannels: build.query({
      query: () => ({
        url: "/v1/channels",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(switchActiveChannel(data[0]?.id));
        } catch (error) {
          console.error(error);
        }
      },
      async onCacheEntryAdded(
        _,
        {
          cacheDataLoaded,
          cacheEntryRemoved,
          updateCachedData,
          getState,
          dispatch,
        }
      ) {
        const newChannelListener = (data) => {
          const channels = selectChannels(getState());
          if (!channels.find((channel) => channel.id === data.id)) {
            updateCachedData((draft) => {
              draft.push(data);
            });
          }
        };
        const removeChannelListener = (data) => {
          // @ts-ignore
          if (selectActiveChannelId(getState()) === data.id) {
            const channels = selectChannels(getState());
            dispatch(switchActiveChannel(channels[0]?.id));
          }
          updateCachedData((draft) => {
            return draft.filter((channel) => channel.id !== data.id);
          });
        };
        const renameChannelListener = (data) => {
          updateCachedData((draft) => {
            return draft.map((channel) => {
              if (channel.id === data.id) {
                return data;
              }
              return channel;
            });
          });
        };

        try {
          await cacheDataLoaded;
          socket.on("newChannel", newChannelListener);
          socket.on("removeChannel", removeChannelListener);
          socket.on("renameChannel", renameChannelListener);
        } catch (error) {
          console.error(error);
        }

        await cacheEntryRemoved;
        socket.removeListener("newChannel", newChannelListener);
        socket.removeListener("removeChannel", removeChannelListener);
        socket.removeListener("renameChannel", renameChannelListener);
      },
    }),
    addChannel: build.mutation({
      query: ({ name }) => ({
        url: "/v1/channels",
        method: "POST",
        body: {
          name: profanity.censor(name),
        },
      }),
    }),
    removeChannel: build.mutation({
      query: ({ id }) => ({
        url: `/v1/channels/${id}`,
        method: "DELETE",
      }),
    }),
    editChannel: build.mutation({
      query: ({ id, name }) => ({
        url: `/v1/channels/${id}`,
        method: "PATCH",
        body: {
          name: profanity.censor(name),
        },
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useEditChannelMutation,
} = channelsApi;

export default {
  channels: channelsSlice.reducer,
  [channelsApi.reducerPath]: channelsApi.reducer,
};
