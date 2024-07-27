type Prettify<T extends object> = {
  [Key in keyof T]: T[Key]
} & {}

type InfoBasicFile = {
  type: 'file'
  name: string
  size: number
  createdAt: Date
  modifiedAt: Date
}

type InfoBasicDir = {
  type: 'dir'
  name: string
  createdAt: Date
  modifiedAt: Date
}

type InfoDir = Prettify<
  InfoBasicDir & {
    childDirs: Record<string, InfoBasicDir>
    childFiles: Record<string, InfoBasicFile>
  }
>

type InfoFile = Prettify<
  InfoBasicFile & {
    content?: string
  }
>
