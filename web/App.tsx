import { createStyles, makeStyles, DefaultTheme } from '@mui/styles'
import Login from './features/Auth/Login'

const style = makeStyles({}, { defaultTheme: 'dark' })

function App() {
  return <Login />
}


// @ts-ignore
console.log(import.meta.env)
export default App
