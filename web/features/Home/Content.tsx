import { useStore } from '@/store'
import ContentGrid from './ContentGrid'
import ContentTable from './ContentTable'

const Content = () => {
  const showType = useStore((state) => state.homeui.config.showType)
  return showType === 'grid' ? <ContentGrid /> : <ContentTable />
}

export default Content
