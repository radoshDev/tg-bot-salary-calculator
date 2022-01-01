import { SheetHeaders } from "../types/spreadSheetTypes"
import { calculateDayIncome } from "./calculateDayIncome"
import { parseDate } from "./parseDate"

export function parseUserText(inputText: string): SheetHeaders {
	const regExp = /((?<date>([a-я]|(\d{1,2}(\.\d{1,2})?))+)\s+)?(?<revenue>\d{4,})(\s+(?<comment>\w+))?/i
	const groupeResult = inputText.match(regExp)

	const date = groupeResult?.groups?.["date"] || ""
	const revenue = groupeResult?.groups?.["revenue"] || ""
	const comment = groupeResult?.groups?.["comment"] || ""
	const dayIncome = calculateDayIncome(revenue)

	return {
		date: parseDate(date),
		revenue,
		comment,
		day_income: dayIncome.toString(),
	}
}
