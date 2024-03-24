import { getDriveUrl } from '@/api/react'
import { FileResponse } from '@/types/data'
import css from './ContentFile.module.scss'
import { bytesToAutoUnit } from '@/utils'
import { useEffect, useState } from 'react'
import DownloadIcon from '@/assets/icons/download.svg'

export default function ContentFile({ file }: { file: FileResponse }) {
  const fullUrl = getDriveUrl(file.url)

  return (
    <div>
      <div className={css.header}>
        <div className={css.fileHeaderText}>
          <h3>{file.name}</h3>
          <p className={css.textFileSize}>({bytesToAutoUnit(file.size)})</p>
        </div>

        <div>
          <button
            className={css.downloadButton}
            onClick={() => {
              const a = document.createElement('a')
              a.href = fullUrl
              a.download = file.name
              a.target = '_blank'
              a.click()
            }}
          >
            <DownloadIcon />
          </button>
        </div>
      </div>

      <div className={css.preview}>
        {(() => {
          const ext = file.name.split('.').pop()?.toLowerCase() ?? ''
          const extType = Object.entries(Ext).find(([_, { exts }]) =>
            exts.includes(ext)
          )?.[0]

          if (extType) {
            const { Compontnt } = Ext[extType as keyof typeof Ext]
            return <Compontnt src={fullUrl} />
          } else {
            return <div>Preview not available</div>
          }
        })()}
      </div>
    </div>
  )
}

function ImagePreview({ src }: { src: string }) {
  return <img className={css.previewImage} src={src} />
}

function VideoPreview({ src }: { src: string }) {
  return <video className={css.previewVideo} src={src} controls />
}

import SyntaxHighlighter from 'react-syntax-highlighter'
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

function TextPreview({ src }: { src: string }) {
  const [text, setText] = useState('')

  useEffect(() => {
    fetch(src)
      .then((res) => res.text())
      .then((text) => setText(text))
  }, [])

  return (
    <SyntaxHighlighter
      style={atomOneDark}
      language={src.match(/[^.]+$/)?.[0]?.toLowerCase()}
    >
      {text}
    </SyntaxHighlighter>
  )
}

const Ext = {
  image: {
    Compontnt: ImagePreview,
    exts: [
      'png',
      'jpg',
      'jpeg',
      'gif',
      'webp',
      'ico',
      'svg',
      'bmp',
      'tiff',
      'tif',
    ],
  },

  video: {
    Compontnt: VideoPreview,
    exts: ['mp4', 'webm', 'ogg', 'avi', 'mov', 'flv', 'mkv', 'wmv', '3gp'],
  },

  text: {
    Compontnt: TextPreview,
    exts: [
      'txt',
      'md',
      'json',
      'js',
      'cjs',
      'mjs',
      'jsx',
      'cjsx',
      'mjsx',
      'ts',
      'cts',
      'mts',
      'tsx',
      'ctsx',
      'mtsx',
      'html',
      'css',
      'scss',
      'xml',
      'yml',
      'yaml',
      'log',
      'env',
      'csv',
      'sql',
      'sh',
      'bat',
      'ps1',
      'py',
      'rb',
      'java',
      'c',
      'cpp',
      'cs',
      'go',
      'kt',
      'rs',
      'swift',
      'gitignore',
      'dockerfile',
      'editorconfig',
      'gitattributes',
    ],
  },
}
