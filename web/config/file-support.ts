import {
  FcDocument,
  FcImageFile,
  FcAudioFile,
  FcVideoFile,
} from 'react-icons/fc'
import { lazy } from 'react'
import { IconType } from 'react-icons'

const fileGroup: Record<string, FileSupport> = {
  Image: {
    IconComponent: FcImageFile,
    ViewComponent: lazy(() => import('@/features/View/Image')) as ViewComponent,
    extensions: new Set([
      'jpg',
      'jpeg',
      'png',
      'svg',
      'webp',
      'gif',
      'bmp',
      'tiff',
      'ico',
    ]),
  },

  Audio: {
    IconComponent: FcAudioFile,
    ViewComponent: lazy(() => import('@/features/View/Audio')) as ViewComponent,
    extensions: new Set([
      'mp3',
      'wav',
      'aac',
      'flac',
      'ogg',
      'wma',
      'm4a',
      'aiff',
      'alac',
    ]),
  },

  Video: {
    IconComponent: FcVideoFile,
    ViewComponent: lazy(() => import('@/features/View/Video')) as ViewComponent,
    extensions: new Set([
      'mp4',
      'mkv',
      'webm',
      'avi',
      'mov',
      'wmv',
      'flv',
      'm4v',
      'mpeg',
      'mpg',
    ]),
  },

  Text: {
    IconComponent: FcDocument,
    ViewComponent: lazy(() => import('@/features/View/Text')) as ViewComponent,
    extensions: new Set([
      'txt',
      'js',
      'ts',
      'jsx',
      'tsx',
      'cjs',
      'mjs',
      'cts',
      'mts',
      'cjsx',
      'mjsx',
      'ctsx',
      'mtsx',
      'json',
      'jsonp',
      'md',
      'yml',
      'yaml',
      'xml',
      'csv',
      'log',
      'ini',
      'rtf',
      'html',
      'htm',
      'css',
      'scss',
      'less',
      'sass',
      'php',
      'py',
      'java',
      'c',
      'cpp',
      'h',
      'hpp',
      'cs',
      'sql',
      'sh',
      'bash',
      'zsh',
      'fish',
      'bashrc',
      'bash_profile',
      'profile',
      'cmd',
      'bat',
      'ps1',
      'psm1',
      'psd1',
      'ps1xml',
      'psrc',
      'pssc',
      'vbs',
      'wsf',
      'wsc',
      'asp',
      'aspx',
      'jsp',
      'jspx',
      'erb',
      'coffee',
      'cson',
      'iced',
      'gitignore',
      'gitattributes',
      'editorconfig',
      'babelrc',
      'eslintrc',
      'eslintignore',
      'stylelintrc',
      'stylelintignore',
      'prettierrc',
      'prettierignore',
      'dockerignore',
      'dockerfile',
      'gitmodules',
      'gitkeep',
      'npmrc',
      'npmignore',
      'yarnrc',
    ]),
  },
}

export type ViewComponent = (props: { url: string }) => JSX.Element
type FileSupport = {
  extensions: Set<string>
  IconComponent?: IconType
  ViewComponent?: ViewComponent
}

export default function (ext: string) {
  for (const key in fileGroup) {
    const value = fileGroup[key]

    if (value.extensions.has(ext)) {
      return value
    }
  }
}
