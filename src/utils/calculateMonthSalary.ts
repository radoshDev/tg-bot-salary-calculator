import { SheetRow } from "../types/spreadSheetTypes"

export function calculateMonthSalary(rows: SheetRow[]): number {
	return rows.reduce((sum, row) => sum + Number(row.day_income), 0)
}
