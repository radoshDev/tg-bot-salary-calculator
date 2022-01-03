import { SheetRow } from "../types/spreadSheetTypes"
import { compareMonth } from "./compareMonth"
import { Convertor } from "./Convertor"

export function generateMonthBtnText(rows: SheetRow[]): string[] {
	const uniqMonthYearWithDon = rows
		.map(row => row.date?.slice(3) || "")
		.filter((item, pos, self) => self.indexOf(item) === pos)
		.sort((a, b) => compareMonth("01." + a, "01." + b, "desc"))

	const buttonsList = uniqMonthYearWithDon.map(item => {
		const [month, year] = item.split(".")
		return `${Convertor.codeToMonth(month)} ${year}`
	})

	return buttonsList
}
