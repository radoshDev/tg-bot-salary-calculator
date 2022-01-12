import { ADVANCE_TEXT } from "../constants"
import { SheetRow } from "../types/spreadSheetTypes"

export function calculateSalary(rows: SheetRow[], type: "total" | "advance"): number {
	// eslint-disable-next-line unicorn/no-array-reduce
	return rows.reduce((sum, row) => {
		let dayIncome
		if (type === "total") {
			dayIncome = row.comment?.includes(ADVANCE_TEXT) ? 0 : row.day_income
		}
		if (type === "advance") {
			dayIncome = row.comment?.includes(ADVANCE_TEXT) ? row.day_income : 0
		}
		return sum + Number(dayIncome)
	}, 0)
}
