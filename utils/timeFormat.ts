import { capitalizeWords } from './capitalizeWords'

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

export const getDateFormat = ({
  date,
  showToday = true,
}: {
  date: Date
  showToday: boolean
}) => {
  date = new Date(date)
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)

  let options
  if (!showToday && date.getDate() === today.getDate()) {
    options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    } as const
    return new Intl.DateTimeFormat('en-US', options)
      .format(new Date(date))
      .toLowerCase()
  } else if (
    date.getDate() === today.getDate() ||
    date.getDate() === yesterday.getDate()
  ) {
    options = {
      numeric: 'auto',
    } as const
    return new Intl.RelativeTimeFormat(undefined, options).format(
      date.getDate() - today.getDate(),
      'day'
    )
  } else if (Math.abs(date.getTime() - today.getTime()) < 604800000) {
    options = {
      weekday: 'long',
    } as const
  } else {
    options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    } as const
  }
  return capitalizeWords(
    new Intl.DateTimeFormat('es-Mx', options)
      .format(new Date(date))
      .toLowerCase()
  )
}

export const isDifferentDay = (date1: Date | undefined, date2: Date) => {
  if (!date1) return true
  const date1Copy = new Date(date1)
  const date2Copy = new Date(date2)
  date1Copy.setHours(0, 0, 0, 0)
  date2Copy.setHours(0, 0, 0, 0)
  return date1Copy.getTime() !== date2Copy.getTime()
}
