import { useStore } from '@/store'
import ContentGrid from './ContentGrid'
import ContentTable from './ContentTable'
import useContentData from './useContentData'

const Content = () => {
  useContentData()
  const showType = useStore((state) => state.homeui.config.showType)
  return showType === 'grid' ? <ContentGrid /> : <ContentTable />
}

export default Content
