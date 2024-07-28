type Prettify<T extends object> = {
  [Key in keyof T]: T[Key]
} & {}

type InfoChildFileServer = {
  type: 'file'
  name: string
  ext: string
  size: number
  createdAt: Date
  modifiedAt: Date
}

type InfoChildFileWeb = InfoChildFileServer & { selected?: boolean }

type InfoChildDirServer = {
  type: 'dir'
  name: string
  createdAt: Date
  modifiedAt: Date
}

type InfoChildDirWeb = InfoChildDirServer & { selected?: boolean }

type InfoDirServer = Prettify<
  InfoChildDirServer & {
    childDirs: Record<string, InfoChildDirServer>
    childFiles: Record<string, InfoChildFileServer>
  }
>

type InfoDirWeb = Prettify<
  InfoChildDirServer & {
    childDirs: Record<string, InfoChildDirWeb>
    childFiles: Record<string, InfoChildFileWeb>
  }
>

type InfoDetailedFile = Prettify<InfoChildFileServer & {}>
