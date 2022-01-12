import { Markup } from "telegraf"
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"
import { ADVANCE_BTN_TEXT, REPORT_BTN_TEXT, SALARY_BTN_TEXT } from "../constants"

export const mainMenuButtons = (): Markup.Markup<ReplyKeyboardMarkup> =>
	Markup.keyboard([REPORT_BTN_TEXT, SALARY_BTN_TEXT, ADVANCE_BTN_TEXT], {
		columns: 3,
	}).resize()
