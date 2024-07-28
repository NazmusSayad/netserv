export function formatDate(date: Date) {
  const currentDate = new Date()
  const newDateInstance = new Date(date)

  if (currentDate.toDateString() === newDateInstance.toDateString()) {
    return currentDate.toLocaleTimeString()
  }

  return currentDate.toLocaleDateString()
}
