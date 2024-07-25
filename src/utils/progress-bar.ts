import cliProgress = require('cli-progress')

export default function ProgressBar(totalSize: number) {
  const bar = new cliProgress.SingleBar({
    format:
      '{bar} {percentage}% | {speed} | ETA: {etaTime} | {dataSize}/{totalSize}',
    barCompleteChar: '\u2588',
    barIncompleteChar: '\u2591',
    hideCursor: true,
  })

  const totalSizeUnit = convertBytesToUnit(totalSize)
  let dataStatusSize = 0

  bar.start(100, 0, {
    totalSize: totalSizeUnit,
    speed: 'N/A',
    etaTime: 'N/A',
  })

  let prevDataStatusSize = 0
  const interval = setInterval(() => {
    const speed = dataStatusSize - prevDataStatusSize
    const eta = (totalSize - dataStatusSize) / speed

    bar.update(getStatusPercentage(), {
      speed: convertBytesToUnit(speed) + '/s',
      etaTime: convertSecondsToUnit(eta),
    })

    prevDataStatusSize = dataStatusSize
  }, 1000)

  function getStatusPercentage() {
    return +((dataStatusSize / totalSize) * 100).toFixed(2)
  }

  return {
    update(dataSize: number) {
      dataStatusSize = dataSize

      const percentage = getStatusPercentage()
      bar.update(percentage, {
        totalSize: totalSizeUnit,
        dataSize: convertBytesToUnit(dataStatusSize),
      })

      return percentage
    },

    stop() {
      bar.stop()
      clearInterval(interval)
    },
  }
}

function convertBytesToUnit(sizeBytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  if (sizeBytes === 0) return '0 Bytes'

  const i = parseInt(
    Math.floor(Math.log(sizeBytes) / Math.log(1024)) as unknown as string,
    10
  )

  const size = sizeBytes / Math.pow(1024, i)

  return `${size.toFixed(2)} ${units[i]}`
}

function convertSecondsToUnit(seconds: number) {
  seconds = Math.round(seconds)

  const years = Math.floor(seconds / (365 * 24 * 60 * 60))
  seconds %= 365 * 24 * 60 * 60
  const months = Math.floor(seconds / (30 * 24 * 60 * 60))
  seconds %= 30 * 24 * 60 * 60
  const days = Math.floor(seconds / (24 * 60 * 60))
  seconds %= 24 * 60 * 60
  const hours = Math.floor(seconds / (60 * 60))
  seconds %= 60 * 60
  const minutes = Math.floor(seconds / 60)
  seconds %= 60

  let result = ''
  if (years > 0) {
    result += `${years}y `
  }
  if (months > 0 || years > 0) {
    result += `${months}m `
  }
  if (days > 0 || months > 0 || years > 0) {
    result += `${days}d `
  }
  if (hours > 0 || days > 0 || months > 0 || years > 0) {
    result += `${hours}h `
  }
  if (minutes > 0 || hours > 0 || days > 0 || months > 0 || years > 0) {
    result += `${minutes}m `
  }
  result += `${seconds}s`

  return result.trim()
}
