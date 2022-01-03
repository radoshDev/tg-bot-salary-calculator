import { REVENUE_REG_EXP } from "../constants"
import { SheetHeaders } from "../types/spreadSheetTypes"
import { calculateDayIncome } from "./calculateDayIncome"
import { parseDate } from "./parseDate"

export function parseUserText(inputText: string): SheetHeaders {
	const groupeResult = inputText.match(REVENUE_REG_EXP)

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
