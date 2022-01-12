import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet"
import { Context, Scenes } from "telegraf"

interface Headers {
	[header: string]: string | number | boolean
}

export interface SheetHeaders extends Headers {
	date: string
	revenue: string
	day_income: string
	comment: string
}

export interface SheetRow extends GoogleSpreadsheetRow {
	date?: SheetHeaders["date"]
	revenue?: SheetHeaders["revenue"]
	day_income?: SheetHeaders["day_income"]
	comment?: SheetHeaders["comment"]
}

interface MySession extends Scenes.SceneSession {
	// will be available under `ctx.session.mySessionProp`
	rows: SheetRow[]
	sheet: GoogleSpreadsheetWorksheet
	advance: SheetHeaders
}

export interface MyContext extends Context {
	session: MySession
	scene: Scenes.SceneContextScene<MyContext>
}
