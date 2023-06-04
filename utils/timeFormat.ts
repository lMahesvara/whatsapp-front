export const getTimeFormat = (date: Date) => {
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  } as const

  return new Intl.DateTimeFormat('en-US', options)
    .format(new Date(date))
    .toLowerCase()
}
