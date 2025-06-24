import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { io } from 'socket.io-client'
import { i18n } from './i18n'
import { toast } from 'react-toastify'
import { logout } from '@/features/authSlice'

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
baseQuery.withTokenHandler = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions)

  if (result?.error?.status === 401) {
    api.dispatch(logout())
    toast.info(i18n.t('common.errors.tokenExpiration'))
  }
  else if (typeof result?.error?.status === 'number' && result.error.status > 400) {
    toast.error(result.error.data?.error || i18n.t('common.errors.generic'))
  }

  return result
}

export const socket = io({
  path: '/socket.io',
  transports: ['websocket'],
  autoConnect: true,
  reconnection: true,
})

socket.io.on('reconnect', () => {
  toast.info(i18n.t('common.errors.networkOnline'))
  toast.done('network-status')
})

socket.io.on('reconnect_error', () => {
  toast.warn(i18n.t('common.errors.networkOffline'), {
    autoClose: false,
    toastId: 'network-status',
  })
})
