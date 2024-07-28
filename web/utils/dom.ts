export function getScrollBarWidth() {
  const outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.overflow = 'scroll'
  document.body.appendChild(outer)

  const inner = document.createElement('div')
  outer.appendChild(inner)

  const width = outer.offsetWidth - inner.offsetWidth

  document.body.removeChild(outer)

  return width
}

export async function downloadUsingDOM(url: string) {
  const res = await fetch(url, { credentials: 'include' })
  const blob = await res.blob()
  const blobUrl = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = blobUrl
  a.download = url.split('/').pop() ?? 'download'
  a.click()
}
