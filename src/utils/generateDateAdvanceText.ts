import { SheetRow } from "../types/spreadSheetTypes"

export const generateDateAdvanceText = (rows: SheetRow[]) => {
	return rows.map(row => `<i>${row.date}</i> - <b>${row.day_income} грн</b>`).join("\n")
}
