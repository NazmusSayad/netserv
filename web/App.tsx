import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createSuspense } from './api/react'
import { LoadingSuspense } from './components/Loading'
import Router from './Router'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingSuspense>
        <AppInit />
      </LoadingSuspense>
    </ThemeProvider>
  )
}

const useSuspense = createSuspense()
function AppInit() {
  useSuspense({ url: '/auth/init' }, ([{ data }]) => {
    if (data.authEnabled) {
      data.jwt && $store.auth.login(data.jwt)
    } else {
      $store.auth.disableAuth()
    }
  })

  return <Router />
}

export default App
