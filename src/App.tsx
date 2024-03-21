import { Suspense } from 'react'
import NavBar from './components/NavBar'
import Content from './components/Content'
import Upload from './components/Upload'

const App = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<h1>Loading.......</h1>}>
        <Content />
      </Suspense>
      <Upload />
    </>
  )
}

export default App
