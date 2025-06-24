import 'bootstrap/dist/css/bootstrap.min.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'

import { router } from './router'
import { store } from './store'

const rollbarConfig = {
  accessToken: '6538f74707a14ee9ac00b7347619cef2',
  captureUncaught: true,
  captureUnhandledRejections: true,
  payload: {
    environment: 'testenv',
    // context: 'rollbar/test'
    client: {
      javascript: {
        code_version: '1.0',
        // source_map_enabled: true,
        // guess_uncaught_frames: true
      },
    },
  },
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  </StrictMode>,
)
