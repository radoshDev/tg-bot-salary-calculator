import { GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet"
import { Context, Scenes } from "telegraf"

type Headers = "date" | "revenue" | "day_income" | "comment"

export type SheetHeaders<H extends string = Headers> = { [P in H]: string }

export type SheetRow = Partial<SheetHeaders> & GoogleSpreadsheetRow

type MySession = {
	rows: SheetRow[]
	sheet: GoogleSpreadsheetWorksheet
	advance: SheetHeaders
} & Scenes.SceneSession

export type MyContext = {
	session: MySession
	scene: Scenes.SceneContextScene<MyContext>
} & Context
