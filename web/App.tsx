import { createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { createSuspense } from './api/react'
import { actions } from './store'
import Router from './Router'
import { Suspense } from 'react'
import type {} from '@mui/x-data-grid/themeAugmentation'

const theme = createTheme({
  palette: {
    mode: 'dark',
  },

  components: {
    // Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
    MuiDataGrid: {
      styleOverrides: {
        filterForm: { backgroundColor: 'transparent' },
        headerFilterRow: { backgroundColor: 'transparent' },
        panelHeader: {
          backgroundColor: 'transparent',
        },
        columnHeader: {
          backgroundColor: 'transparent',
        },
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
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
    if (data?.jwt) actions.auth.login(data?.jwt)
    else if (data?.authEnabled) actions.auth.enableAuth()
    else throw new Error('No auth or auth enabled')
  })

  return <Router />
}

export default App
