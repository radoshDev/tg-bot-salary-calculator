import { SheetHeaders, SheetRow } from "../types/spreadSheetTypes"

export function isValueExist(rows: SheetRow[], { col, value }: { col: keyof SheetHeaders; value: string }): boolean {
	return !!rows.find(row => row[col] === value)
}
