import { ViewComponent } from '@/config/file-support'

const Video: ViewComponent = ({ url }) => {
  console.log('Video', url)

  return (
    <div className={'size-full'}>
      <video src={url} controls className="w-full" />
    </div>
  )
}

export default Video
