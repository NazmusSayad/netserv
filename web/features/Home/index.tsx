import AddressBar from './AddressBar'
import Content from './Content'
import Header from './Header'

const Home = (props) => {
  return (
    <div className="h-[inherit] grid auto-rows-[auto_1fr]">
      <div className="bg-zinc-900">
        <div className="max-w-3xl mx-auto py-1 px-2">
          <Header />
        </div>
        <hr className="opacity-25" />
        <div className="max-w-3xl mx-auto py-1 px-2">
          <AddressBar />
        </div>
        <hr className="opacity-25" />
      </div>

      <div className="bg-zinc-800">
        <div className="max-w-3xl mx-auto py-1 px-2">
          <Content />
        </div>
      </div>
    </div>
  )
}

export default Home
