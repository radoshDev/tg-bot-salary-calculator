import { Markup } from "telegraf"
import { ReplyKeyboardMarkup } from "telegraf/typings/core/types/typegram"
import { LOAD_BTN_TEXT } from "../constants"

export function loaderButton(): Markup.Markup<ReplyKeyboardMarkup> {
	return Markup.keyboard([LOAD_BTN_TEXT], {
		columns: 3,
	}).resize()
}
