import { ViewComponent } from '@/config/file-support'

const Audio: ViewComponent = ({ url }) => {
  return (
    <div className={'size-full'}>
      <audio src={url} className="object-contain size-full" />
    </div>
  )
}

export default Audio
