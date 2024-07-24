import { Route, Routes } from 'react-router-dom'
import Login from './features/Auth/Login'
import { createSuspense } from './api/react'

const useSuspense = createSuspense()

function Router() {
  console.log('Hello')
  
  const result = useSuspense({ url: '/init' })
  console.log(result)

  return (
    <Routes>
      <Route path="/" element={<h1>Hello</h1>} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default Router
