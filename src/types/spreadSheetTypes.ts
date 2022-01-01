import { GoogleSpreadsheetRow } from "google-spreadsheet"
import { Context, Scenes } from "telegraf"

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
	comment?: SheetHeaders["comment"]
}

interface MySession extends Scenes.SceneSession {
	// will be available under `ctx.session.mySessionProp`
	rows: SheetRow[]
}

export interface MyContext extends Context {
	session: MySession
	scene: Scenes.SceneContextScene<MyContext>
}
