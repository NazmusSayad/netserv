export type DirInfo = {
  directories: string[]
  files: FileInfo[]
}

export type FileInfo = {
  name: string
  ext: string
  url: string
  size: number
  createdAt: Date
  modifiedAt: Date
}

export type FileResponse = { type: 'file' } & FileInfo
export type DirResponse = { type: 'dir' } & DirInfo

export type ApiResponse = FileResponse | DirResponse
