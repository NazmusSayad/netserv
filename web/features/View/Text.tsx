import { useEffect, useState } from 'react'
import type { ViewComponent } from '@/config/file-support'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { tomorrowNight } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { Loading } from '@/components/Loading'

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

  if (loading) return <Loading>Loading preview....</Loading>

  return (
    <div className={'select-text'}>
      <SyntaxHighlighter
        wrapLines
        wrapLongLines
        showLineNumbers
        style={tomorrowNight}
        className={'size-full !bg-transparent'}
      >
        {text}
      </SyntaxHighlighter>
    </div>
  )
}

export default Text
