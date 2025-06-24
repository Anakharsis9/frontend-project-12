import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { io } from 'socket.io-client'
import { i18n } from './i18n'
import { toast } from 'react-toastify'

export const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const user = getState().auth.user
    if (user?.token) {
      headers.set('Authorization', `Bearer ${user.token}`)
    }
    return headers
  },
})
export const socket = io({
  path: '/socket.io',
  transports: ['websocket'],
  autoConnect: true,
  reconnection: true,
})

socket.on('reconnect', () => {
  if (navigator.onLine) {
    toast.info(i18n.t('common.errors.networkOnline'))
    toast.done('network-status')
  }
})

socket.on('connect_error', () => {
  if (!navigator.onLine) {
    toast.warn(i18n.t('common.errors.networkOffline'), {
      autoClose: false,
      toastId: 'network-status',
    })
  }
})
