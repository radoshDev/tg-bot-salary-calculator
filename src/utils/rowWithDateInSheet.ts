import { SheetHeaders, SheetRow } from "../types/spreadSheetTypes"

export function rowWithDateInSheet(
	rows: SheetRow[],
	date: string
): SheetRow | undefined {
	return rows.find(row => row['date']?.includes(date) && !row["comment"]?.includes('аванс'))
}
