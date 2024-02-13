import React from 'react'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import ErrorBoundary from 'error-boundary-react'

import 'css-reset-plus'
import './styles/index.scss'
import App from './App'
import { store } from '@/store'

const rootElement = document.getElementById('Root')!
const root = createRoot(rootElement)

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ErrorBoundary fallback={<h1>Error</h1>}>
        <HashRouter>
          <App />
        </HashRouter>
      </ErrorBoundary>
    </Provider>
  </React.StrictMode>
)
