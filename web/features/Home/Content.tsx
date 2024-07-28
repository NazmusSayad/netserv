import ContentGrid from './ContentGrid'
import ContentTable from './ContentTable'
import { useFetchContentData } from './useContentData'

const Content = () => {
  useFetchContentData()
  const showType = $useStore((state) => state.homeui.config.showType)
  return showType === 'grid' ? <ContentGrid /> : <ContentTable />
}

export default Content
