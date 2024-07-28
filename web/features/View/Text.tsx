import { useEffect, useState } from 'react'
import { ViewComponent } from '@/config/file-support'

const Text: ViewComponent = ({ url }) => {
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(url, { credentials: 'include' })
        setText(await res.text())
      } catch (err) {
        alert('Something went wrong ' + url)
      }
      setLoading(false)
    })()
  }, [])

  return loading ? <h1>Loading Preview.....</h1> : <LoadContent text={text} />
}

const LoadContent = ({ text }: { text: string }) => {
  return <div className={'size-full'}>{text.repeat(10)}</div>
}

export default Text
