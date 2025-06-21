import { baseQuery } from "@/api";
import { createSelector } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";
import { selectActiveChannelId } from "./channelsSlice";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  tagTypes: ["messages"],
  baseQuery,
  endpoints: (build) => ({
    getMessages: build.query({
      query: () => ({
        url: "/v1/messages",
        method: "GET",
      }),
    }),
    addMessage: build.mutation({
      query: ({ body, channelId, username }) => ({
        url: "/v1/messages",
        method: "POST",
        body: {
          body,
          channelId,
          username,
        },
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;

export const selectMessages = (state) =>
  state.messagesApi.queries["getMessages(undefined)"]?.data ?? [];

export const selectActiveMessages = createSelector(
  [selectMessages, selectActiveChannelId],
  (messages, activeChannelId) =>
    messages.filter((c) => c.channelId === activeChannelId)
);

export default {
  [messagesApi.reducerPath]: messagesApi.reducer,
};
