import { Scenes } from "telegraf"
import { monthsButtons } from "../buttons/monthsButtons"
import { mainMenuButtons } from "../buttons/mainMenuButtons"
import { EXIT_BTN_TEXT, MAX_MONTHS, MONTH_REG_EXP, MORE_BTN_TEXT, REPORT_SCENE_ID } from "../constants"
import { MyContext } from "../types/spreadSheetTypes"
import { compareMonth } from "../utils/compareMonth"
import { Convertor } from "../utils/Convertor"
import { generateReportText } from "../utils/generateReportText"
import { generateSalaryText } from "../utils/generateSalaryText"

const { leave } = Scenes.Stage

export const reportScene = new Scenes.BaseScene<MyContext>(REPORT_SCENE_ID)

reportScene.leave(ctx => ctx.reply("Головне меню", mainMenuButtons()))

reportScene.enter(async ctx => {
	const { rows } = ctx.session

	if (!rows) return false

	return ctx.reply("Вибери місяць:", monthsButtons(rows, MAX_MONTHS))
})

reportScene.hears(MONTH_REG_EXP, ctx => {
	const [_, month, year] = ctx.match
	const numerableDateMonthYear = `${Convertor.monthToCode(month)}.${year}`
	const rowsOfMonth = ctx.session.rows
		.filter(row => row.date?.includes(numerableDateMonthYear))
		.sort((a, b) => compareMonth(a.date, b.date, "asc"))
	return ctx.replyWithHTML(generateReportText(rowsOfMonth) + generateSalaryText(rowsOfMonth, ctx.message.text))
})

reportScene.hears(EXIT_BTN_TEXT, leave<MyContext>())

reportScene.hears(MORE_BTN_TEXT, ctx => {
	const { rows } = ctx.session
	return ctx.reply("Вибери місяць, це все що маю я:", monthsButtons(rows))
})

reportScene.on("message", ctx => ctx.replyWithMarkdown("Треба вибрати з кнопок"))
