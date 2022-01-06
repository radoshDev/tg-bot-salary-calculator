import { ERROR_MSG_FUTURE_DATE, LOCALES } from "../constants"
import { startWithZero } from "./startWithZero"

export function parseDate(date: string | undefined): string {
	if (!date) return new Date().toLocaleDateString(LOCALES)

	const currentDate = new Date()
	if (date === "вчора") currentDate.setDate(currentDate.getDate() - 1)
	if (date === "позавчора") currentDate.setDate(currentDate.getDate() - 2)

	const [currentDay, currentMonth, currentYear] = currentDate.toLocaleDateString(LOCALES).split(".")
	let [userDay, userMonth, userYear] = date.split(".")
	userYear = userYear?.length === 2 ? `20${userYear}` : userYear
	const day = startWithZero(/\d/.test(userDay) ? userDay : currentDay)
	const month = startWithZero(userMonth || currentMonth)
	const year = startWithZero(userYear || currentYear)
	const result = `${day}.${month}.${year}`
	if (Date.parse(result) > currentDate.getDate()) {
		throw new Error(ERROR_MSG_FUTURE_DATE)
	}
	return result
}
