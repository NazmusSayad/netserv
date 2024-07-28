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
  const a = document.createElement('a')
  a.href = url
  a.style.display = 'none'
  a.download = url.split('/').pop() ?? 'download'

  if (!url.startsWith(location.origin)) {
    a.target = '_blank'
  }

  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  URL.revokeObjectURL(a.href)
}
