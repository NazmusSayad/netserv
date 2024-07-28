import { Loading, LoadingSuspense } from '@/components/Loading'
import PreviewModal from './PreviewModal'
import AddressBar from './AddressBar'
import Content from './Content'
import Wrapper from './Wrapper'
import Header from './Header'

const Home = () => {
  return (
    <div className="h-[inherit] grid auto-rows-[auto_1fr]">
      <div className="bg-zinc-900">
        <Wrapper>
          <div>
            <Header />
          </div>
        </Wrapper>

        <hr className="opacity-25" />

        <Wrapper>
          <AddressBar />
        </Wrapper>

        <hr className="opacity-25" />
      </div>

      <div className={$tw('bg-zinc-800 overflow-y-scroll')}>
        <LoadingSuspense text={'Loading dir...'}>
          <Content />
          {/* <Loading /> */}
        </LoadingSuspense>
      </div>

      <PreviewModal />
    </div>
  )
}

export default Home
