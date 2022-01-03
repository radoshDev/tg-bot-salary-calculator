import { Markup } from "telegraf"
import { EXIT_BTN_TEXT } from "../constants"
import { SheetRow } from "../types/spreadSheetTypes"
import { generateMonthBtnText } from "../utils/generateMonthBtnText"

export function monthsButtons(rows: SheetRow[]) {
	const buttonsList = generateMonthBtnText(rows)

	return Markup.keyboard([EXIT_BTN_TEXT].concat(buttonsList), {
		columns: 3,
	}).resize()
}
