export function formatDate(date: Date) {
  const currentDate = new Date()
  const newDateInstance = new Date(date)

  if (currentDate.toDateString() === newDateInstance.toDateString()) {
    return newDateInstance.toLocaleTimeString()
  }

  return newDateInstance.toLocaleDateString()
}
