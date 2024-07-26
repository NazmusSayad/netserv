import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createSuspense } from './api/react'
import { actions } from './store'
import Router from './Router'
import { Suspense } from 'react'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={<div>Loading...</div>}>
        <AppInit />
      </Suspense>
    </ThemeProvider>
  )
}

const useSuspense = createSuspense()
function AppInit() {
  useSuspense({ url: '/auth/init' }, ([{ data }]) => {
    if (data.authEnabled) {
      data.jwt && actions.auth.login(data.jwt)
    } else {
      actions.auth.disableAuth()
    }
  })

  return <Router />
}

export default App
