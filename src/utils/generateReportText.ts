import { SheetRow } from "../types/spreadSheetTypes"

export function generateReportText(rows: SheetRow[]): string {
	if (rows.length === 0) return "Ще поки нічого не додано в цьому місяці"
	const listOfDays = rows.map(row => {
		const comment = row.comment ? ` <u>(${row.comment})</u>` : ""
		return `<i>${row.date}</i> - <b>${row.day_income} грн</b>${comment}`
	})
	return listOfDays.join("\n")
}
