export function bytesToAutoUnit(bytes: number) {
  const terabyte = 1024 * 1024 * 1024 * 1024
  const gigabyte = 1024 * 1024 * 1024
  const megabyte = 1024 * 1024
  const kilobyte = 1024

  if (bytes >= terabyte) {
    return (bytes / terabyte).toFixed(2) + ' TB'
  } else if (bytes >= gigabyte) {
    return (bytes / gigabyte).toFixed(2) + ' GB'
  } else if (bytes >= megabyte) {
    return (bytes / megabyte).toFixed(2) + ' MB'
  } else if (bytes >= kilobyte) {
    return (bytes / kilobyte).toFixed(2) + ' KB'
  } else {
    return bytes + ' bytes'
  }
}
