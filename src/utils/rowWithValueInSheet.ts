import { SheetHeaders, SheetRow } from "../types/spreadSheetTypes"

export function rowWithValueInSheet(
	rows: SheetRow[],
	{ col, value }: { col: keyof SheetHeaders; value: string }
): SheetRow | undefined {
	return rows.find(row => row[col]?.includes(value))
}
