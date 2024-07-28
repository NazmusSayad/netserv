import { ViewComponent } from '@/config/file-support'

const Image: ViewComponent = ({ url }) => {
  return (
    <div className={'size-full'}>
      <img
        src={url}
        alt={'Image'}
        loading={'lazy'}
        className="object-contain size-full"
      />
    </div>
  )
}

export default Image
