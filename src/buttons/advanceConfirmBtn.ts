import { Markup } from "telegraf"
import { ADVANCE_ADD_ID, ADVANCE_CANCEL_ID } from "../constants"

export const advanceConfirmBtn = () =>
	Markup.inlineKeyboard([
		Markup.button.callback("Додати ще", ADVANCE_ADD_ID),
		Markup.button.callback("Скасувати", ADVANCE_CANCEL_ID),
	])
