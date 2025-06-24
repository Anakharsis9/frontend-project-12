import { baseQuery, socket } from '@/api'
import { createSelector } from '@reduxjs/toolkit'
import { createApi } from '@reduxjs/toolkit/query/react'
import { selectActiveChannelId } from './channelsSlice'
import { profanity } from '@/profanity'

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  tagTypes: ['messages'],
  baseQuery: baseQuery.withTokenHandler,
  endpoints: build => ({
    getMessages: build.query({
      query: () => ({
        url: '/v1/messages',
        method: 'GET',
      }),
      async onCacheEntryAdded(
        _,
        { cacheDataLoaded, cacheEntryRemoved, updateCachedData, getCacheEntry },
      ) {
        const listener = (data) => {
          if (!getCacheEntry().data.find(message => message.id === data.id)) {
            updateCachedData((draft) => {
              draft.push(data)
            })
          }
        }
        try {
          await cacheDataLoaded
          socket.on('newMessage', listener)
        }
        catch (error) {
          console.error(error)
        }

        await cacheEntryRemoved
        socket.removeListener('newMessage', listener)
      },
    }),
    addMessage: build.mutation({
      query: ({ body, channelId, username }) => ({
        url: '/v1/messages',
        method: 'POST',
        body: {
          body: profanity.censor(body),
          channelId,
          username,
        },
      }),
    }),
  }),
})

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi

export const selectMessages = state =>
  state.messagesApi.queries['getMessages(undefined)']?.data ?? []

export const selectActiveMessages = createSelector(
  [selectMessages, selectActiveChannelId],
  (messages, activeChannelId) =>
    messages.filter(c => c.channelId === activeChannelId),
)

export default {
  [messagesApi.reducerPath]: messagesApi.reducer,
}
