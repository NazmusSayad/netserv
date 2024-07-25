import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './features/Auth/Login'
import { useStore } from './store'
import Home from './features/Home'

export default function Router() {
  const authEnabled = useStore((state) => state.auth.authEnabled)
  return authEnabled ? <AuthEnabledRouter /> : <AuthDisabledRouter />
}

function AuthEnabledRouter() {
  const jwt = useStore((state) => state.auth.jwt)

  return (
    <Routes>
      {jwt ? (
        <Route path="*" element={<Home />} />
      ) : (
        <>
          <Route path="*" element={<Navigate to={'/login'} replace />} />
          <Route path="/login" element={<Login />} />
        </>
      )}
    </Routes>
  )
}

function AuthDisabledRouter() {
  return (
    <Routes>
      <Route path="*" element={<Home />} />
    </Routes>
  )
}
