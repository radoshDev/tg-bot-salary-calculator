export type SheetHeaders = {
	date: string
	revenue: string
	day_income: string
	comment: string
}

export interface RegExpExecArray extends Array<string> {
	groups?: SheetHeaders
}
