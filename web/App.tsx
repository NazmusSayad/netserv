import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createSuspense } from './api/react'
import { actions } from './store'
import Router from './Router'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

const useSuspense = createSuspense()

function App() {
  useSuspense({ url: '/auth/init' }, ([{ data }]) => {
    if (data?.jwt) actions.auth.login(data?.jwt)
    else if (data?.authEnabled) actions.auth.enableAuth()
    else throw new Error('No auth or auth enabled')
  })

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router />
    </ThemeProvider>
  )
}

export default App
