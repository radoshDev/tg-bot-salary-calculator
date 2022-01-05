import { ERROR_MSG_FUTURE_DATE } from "../constants"
import { startWithZero } from "./startWithZero"

export function parseDate(date: string | undefined): string {
	if (!date) return new Date().toLocaleDateString()

	const currentDate = new Date()
	if (date === "вчора") currentDate.setDate(currentDate.getDate() - 1)
	if (date === "позавчора") currentDate.setDate(currentDate.getDate() - 2)

	const [currentDay, currentMonth, currentYear] = currentDate.toLocaleDateString().split(".")
	let [userDay, userMonth, userYear] = date.split(".")
	userYear = userYear?.length === 2 ? `20${userYear}` : userYear
	const day = startWithZero(/\d/.test(userDay) ? userDay : currentDay)
	const month = startWithZero(userMonth || currentMonth)
	const year = startWithZero(userYear || currentYear)
	const result = `${day}.${month}.${year}`
	const resultUS = `${month}.${day}.${year}`
	if (Date.parse(resultUS) > currentDate.getDate()) {
		throw new Error(ERROR_MSG_FUTURE_DATE)
	}
	return result
}
