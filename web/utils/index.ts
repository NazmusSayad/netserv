export function sortByKey<TArray extends Record<string, any>[]>(
  array: TArray,
  key: keyof TArray[0],
  order: 'asc' | 'dsc' = 'asc'
): TArray {
  return array.sort((a: any, b: any) => {
    if (a[key] < b[key]) return order === 'asc' ? -1 : 1
    if (a[key] > b[key]) return order === 'asc' ? 1 : -1
    return 0
  })
}

export function formatBytesToUnit(bytes: number): string {
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB']
  if (bytes === 0) return '0 B'
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i]
}
