import NavBar from './components/NavBar'
import Content from './components/Content'
import { Suspense } from 'react'

const App = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<h1>Loading.......</h1>}>
        <Content />
      </Suspense>
    </>
  )
}

export default App
