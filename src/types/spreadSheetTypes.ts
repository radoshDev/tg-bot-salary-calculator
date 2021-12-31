import { GoogleSpreadsheetRow } from "google-spreadsheet"

export type SheetHeaders = {
	date: string
	revenue: string
	day_income: string
	comment: string
}

export interface SheetRow extends GoogleSpreadsheetRow {
	date?: SheetHeaders["date"]
	revenue?: SheetHeaders["revenue"]
	day_income?: SheetHeaders["day_income"]
	comments?: SheetHeaders["comment"]
}
