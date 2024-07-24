import Login from './features/Auth/Login'
import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Login />
    </ThemeProvider>
  )
}

export default App
