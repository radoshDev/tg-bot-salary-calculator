import { Markup } from "telegraf"
import { EXIT_BTN_TEXT } from "../constants"
import { SheetRow } from "../types/spreadSheetTypes"
import { generateMonthButtonText } from "../utils/generateMonthButtonText"

export function monthsButtons(rows: SheetRow[]) {
	const buttonsList = generateMonthButtonText(rows)

	return Markup.keyboard([EXIT_BTN_TEXT, ...buttonsList], {
		columns: 3,
	}).resize()
}
