import { startWithZero } from "./startWithZero"

export function parseDate(date: string): string {
	const currentDate = new Date()
	if (date === "вчора") currentDate.setDate(currentDate.getDate() - 1)
	if (date === "позавчора") currentDate.setDate(currentDate.getDate() - 2)

	const [currentDay, currentMonth, currentYear] = currentDate.toLocaleDateString().split(".")
	const [userDay, userMonth, userYear] = date.split(".")
	const day = startWithZero(/\d/.test(userDay) ? userDay : currentDay)
	const month = startWithZero(userMonth || currentMonth)
	const year = startWithZero(userYear || currentYear)

	return `${day}.${month}.${year}`
}
