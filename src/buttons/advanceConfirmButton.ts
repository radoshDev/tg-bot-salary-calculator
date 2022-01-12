import { Markup } from "telegraf"
import { InlineKeyboardMarkup } from "telegraf/typings/core/types/typegram"
import { ADVANCE_ADD_ID, ADVANCE_CANCEL_ID } from "../constants"

export const advanceConfirmButton = (): Markup.Markup<InlineKeyboardMarkup> =>
	Markup.inlineKeyboard([
		Markup.button.callback("Додати ще", ADVANCE_ADD_ID),
		Markup.button.callback("Скасувати", ADVANCE_CANCEL_ID),
	])
