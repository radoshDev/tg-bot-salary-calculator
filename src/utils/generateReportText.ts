import { calculateMonthSalary } from "./calculateMonthSalary"

export function generateReportText(rows: any): string {
	if (rows.length === 0) return "Ще поки нічого не додано в цьому місяці"
	const listOfDays = rows.map((row: any) => {
		const comment = row.comment ? ` <u>(${row.comment})</u>` : ""
		return `<i>${row.date}</i> - <b>${row.day_income} грн</b>${comment}`
	})
	const summary = `\n\n<b>Разом: ${calculateMonthSalary(rows)} грн</b>`
	return listOfDays.join("\n") + summary
}
