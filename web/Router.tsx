import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
const Login = lazy(() => import('./features/Auth/Login'))
const Home = lazy(() => import('./features/Home'))

export default function Router() {
  const authEnabled = $useStore((state) => state.auth.authEnabled)
  return authEnabled ? <AuthEnabledRouter /> : <AuthDisabledRouter />
}

function AuthEnabledRouter() {
  const jwt = $useStore((state) => state.auth.jwt)

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
