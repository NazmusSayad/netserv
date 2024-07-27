import { actions, useStore } from '@/store'
import { Suspense, useEffect, useRef } from 'react'
import AddressBar from './AddressBar'
import Content from './Content'
import Wrapper from './Wrapper'
import Header from './Header'
import PreviewModal from './PreviewModal'

const Home = () => {
  const wrapperPaddingWidth = useStore(
    (state) => state.homeui.status.wrapperPaddingWidth
  )

  const parentRef = useRef<any>()
  const childRef = useRef<any>()

  useEffect(() => {
    let debounceTimeoutNumber: NodeJS.Timeout
    function handleWindowResize() {
      const bothSizePadding =
        parentRef.current.offsetWidth - childRef.current.offsetWidth

      console.dir(parentRef.current.getBoundingClientRect())

      const optimalPaddingWidth = bothSizePadding / 2
      actions.homeui.setState({ wrapperPaddingWidth: optimalPaddingWidth })
    }

    function handleWindowResizeDebounce() {
      clearTimeout(debounceTimeoutNumber)
      debounceTimeoutNumber = setTimeout(handleWindowResize, 25)
    }

    handleWindowResizeDebounce()
    window.addEventListener('resize', handleWindowResizeDebounce)
    return () => {
      clearTimeout(debounceTimeoutNumber)
      window.removeEventListener('resize', handleWindowResizeDebounce)
    }
  }, [])

  return (
    <div ref={parentRef} className="h-[inherit] grid auto-rows-[auto_1fr]">
      <style>{`:root { --abcdefghij-gap-size: ${wrapperPaddingWidth}px; }`}</style>

      <div className="bg-zinc-900">
        <Wrapper>
          <div ref={childRef}>
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
        <Suspense
          fallback={<div className="h-full bg-red-600">Loading...</div>}
        >
          <Content />
        </Suspense>
      </div>

      <PreviewModal />
    </div>
  )
}

export default Home
