export default function DateFormater(date: number) {
  const newDate = new Date(date * 1000)

  const day = newDate.getDate().toString().padStart(2, '0')
  const month = (newDate.getMonth() + 1).toString().padStart(2, '0')
  const year = newDate.getFullYear()

  const formattedDate = `${day}/${month}/${year}`
  return formattedDate
}
