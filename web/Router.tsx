import { Navigate, Route, Routes } from 'react-router-dom'
import { lazy } from 'react'
const Login = lazy(() => import('./features/Auth/Login'))
const Home = lazy(() => import('./features/Home'))

export default function Router() {
  const authEnabled = $useStore((state) => state.auth.authEnabled)
  const jwt = $useStore((state) => state.auth.jwt)

  return (
    <Routes>
      {authEnabled ? (
        jwt ? (
          <Route path="*" element={<Home />} />
        ) : (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to={'/login'} replace />} />
          </>
        )
      ) : (
        <Route path="*" element={<Home />} />
      )}
    </Routes>
  )
}
