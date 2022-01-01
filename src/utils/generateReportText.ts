import { SheetRow } from "../types/spreadSheetTypes"
import { calculateMonthSalary } from "./calculateMonthSalary"

export function generateReportText(rows: SheetRow[]): string {
	if (rows.length === 0) return "Ще поки нічого не додано в цьому місяці"
	const listOfDays = rows.map(
		row => `<i>${row.date}</i> - <b>${row.day_income} грн</b>${row.comment ? " <u>(" + row.comment + ")</u>" : ""}`
	)
	const summary = `\n\n<b>Разом: ${calculateMonthSalary(rows)} грн</b>`
	return listOfDays.join("\n") + summary
}
