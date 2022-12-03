import { Scenes } from "telegraf"
import { monthsButtons } from "../buttons/monthsButtons"
import { mainMenuButtons } from "../buttons/mainMenuButtons"
import { EXIT_BTN_TEXT, MAX_MONTHS, MONTH_REG_EXP, MORE_BTN_TEXT, SALARY_SCENE_ID } from "../constants"
import { MyContext } from "../types/spreadSheetTypes"
import { Convertor } from "../utils/Convertor"
import { generateSalaryText } from "../utils/generateSalaryText"

const { leave } = Scenes.Stage

export const salaryScene = new Scenes.BaseScene<MyContext>(SALARY_SCENE_ID)
salaryScene.enter(async ctx => {
	const { rows } = ctx.session
	return ctx.reply("Вибери місяць:", monthsButtons(rows, MAX_MONTHS))
})
salaryScene.leave(ctx => ctx.reply("Головне меню", mainMenuButtons()))

salaryScene.hears(MONTH_REG_EXP, ctx => {
	const [_, month, year] = ctx.match
	const numerableDateMonthYear = `${Convertor.monthToCode(month)}.${year}`
	const rowsOfMonth = ctx.session.rows.filter(row => row.date?.includes(numerableDateMonthYear))
	return ctx.replyWithHTML(generateSalaryText(rowsOfMonth, ctx.message.text))
})

salaryScene.hears(EXIT_BTN_TEXT, leave<MyContext>())

salaryScene.hears(MORE_BTN_TEXT, ctx => {
	const { rows } = ctx.session
	return ctx.reply("Вибери місяць, це все що маю я:", monthsButtons(rows))
})

salaryScene.on("message", ctx => ctx.replyWithMarkdown("Треба вибрати з кнопок"))
