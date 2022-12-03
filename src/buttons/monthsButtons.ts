import { Markup } from "telegraf"
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"
import { EXIT_BTN_TEXT, MORE_BTN_TEXT } from "../constants"
import { SheetRow } from "../types/spreadSheetTypes"
import { generateMonthButtonText } from "../utils/generateMonthButtonText"

export function monthsButtons(rows: SheetRow[], maxMonth?: number): Markup.Markup<ReplyKeyboardMarkup> {
	const buttonsList = generateMonthButtonText(rows)

	if (maxMonth && buttonsList.length > maxMonth) {
		const firstFewMonths = buttonsList.slice(0, maxMonth)
		return Markup.keyboard([EXIT_BTN_TEXT, ...firstFewMonths, MORE_BTN_TEXT], {
			columns: 3,
		}).resize()
	}
	return Markup.keyboard([EXIT_BTN_TEXT, ...buttonsList], {
		columns: 3,
	}).resize()
}
