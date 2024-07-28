import {
  FcImageFile,
  FcAudioFile,
  FcVideoFile,
  FcDocument,
} from 'react-icons/fc'
import { IconType } from 'react-icons'
import Image from '@/features/View/Image'
import Text from '@/features/View/Text'

export default function (ext: string) {
  for (const key in fileGroup) {
    const value = fileGroup[key]

    if (value.extensions.has(ext)) {
      return value
    }
  }
}

export type ViewComponent = (props: { url: string }) => JSX.Element

type FileSupport = {
  extensions: Set<string>
  IconComponent?: IconType
  ViewComponent?: ViewComponent
}

const fileGroup: Record<string, FileSupport> = {
  Image: {
    ViewComponent: Image,
    IconComponent: FcImageFile,
    extensions: new Set(['jpg', 'jpeg', 'png', 'svg', 'webp']),
  },

  Audio: {
    IconComponent: FcAudioFile,
    extensions: new Set([]),
  },

  Video: {
    IconComponent: FcVideoFile,
    extensions: new Set([]),
  },

  Text: {
    ViewComponent: Text,
    IconComponent: FcDocument,
    extensions: new Set(['txt', 'js', 'ts', 'jsx', 'tsx', 'json']),
  },
}
