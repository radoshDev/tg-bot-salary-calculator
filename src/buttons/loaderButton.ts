import { Markup } from "telegraf"
import { LOAD_BTN_TEXT } from "../constants"

export function loaderButton() {
	return Markup.keyboard([LOAD_BTN_TEXT], {
		columns: 3,
	}).resize()
}
