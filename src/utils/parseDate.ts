import { parse, isFuture } from "date-fns"
import { ERROR_MSG_FUTURE_DATE, LOCALES } from "../constants"
import { startWithZero } from "./startWithZero"

export function parseDate(date: string | undefined): string {
	if (!date) return new Date().toLocaleDateString(LOCALES)

	const currentDate = new Date()
	if (date === "вчора") currentDate.setDate(currentDate.getDate() - 1)
	if (date === "позавчора") currentDate.setDate(currentDate.getDate() - 2)

	const currentLocaleDate = currentDate.toLocaleDateString(LOCALES)
	const [currentDay, currentMonth, currentYear] = currentLocaleDate.split(".")
	const [userDay, userMonth, userYear] = date.split(".")
	const fullYear = userYear?.length === 2 ? `20${userYear}` : userYear
	const day = startWithZero(/\d/.test(userDay) ? userDay : currentDay)
	const month = startWithZero(userMonth || currentMonth)
	const year = startWithZero(fullYear || currentYear)
	const result = `${day}.${month}.${year}`
	const resultDate = parse(result, "dd.MM.yyyy", new Date())

	if (isFuture(resultDate)) {
		throw new Error(ERROR_MSG_FUTURE_DATE)
	}
	return result
}
