const timeOptions = {
  hour: '2-digit',
  minute: '2-digit',
  hour12: true,
} as const

const dateOptions = {
  day: 'numeric',
  month: 'numeric',
  year: '2-digit',
} as const

export function formatDate(date: Date) {
  const currentDate = new Date()
  const itemDateInstance = new Date(date)

  if (currentDate.getFullYear() === itemDateInstance.getFullYear()) {
    if (currentDate.getMonth() === itemDateInstance.getMonth()) {
      if (currentDate.getDate() === itemDateInstance.getDate()) {
        return itemDateInstance.toLocaleString('en-US', timeOptions)
      }

      return itemDateInstance.toLocaleString('en-US', {
        ...timeOptions,
        ...dateOptions,
        year: undefined,
        month: 'short',
      })
    }

    return itemDateInstance.toLocaleString('en-US', {
      ...timeOptions,
      ...dateOptions,
      year: undefined,
    })
  }

  return itemDateInstance.toLocaleString('en-US', {
    ...timeOptions,
    ...dateOptions,
  })
}
