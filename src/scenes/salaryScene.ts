import { Scenes } from "telegraf"
import { monthsButtons } from "../buttons/monthsButtons"
import { mainMenuButtons } from "../buttons/mainMenuButtons"
import { EXIT_BTN_TEXT, MONTH_REG_EXP, SALARY_SCENE_ID } from "../constants"
import { MyContext } from "../types/spreadSheetTypes"
import { calculateMonthSalary } from "../utils/calculateMonthSalary"
import { Convertor } from "../utils/Convertor"

const { enter, leave } = Scenes.Stage

export const salaryScene = new Scenes.BaseScene<MyContext>(SALARY_SCENE_ID)
salaryScene.enter(async ctx => {
	const rows = ctx.session.rows
	return ctx.reply("Вибери місяць:", monthsButtons(rows))
})
salaryScene.leave(ctx => ctx.reply("Головне меню", mainMenuButtons()))
salaryScene.hears(MONTH_REG_EXP, ctx => {
	const [_, month, year] = ctx.match
	const numerableDateMonthYear = `${Convertor.monthToCode(month)}.${year}`
	const rowsOfMonth = ctx.session.rows.filter(row => row.date?.includes(numerableDateMonthYear))
	const monthSalary = calculateMonthSalary(rowsOfMonth)
	return ctx.replyWithHTML(`Зарплата за <u><i>${month.toLowerCase()} ${year}-го</i></u>: <b>${monthSalary} грн</b>.`)
})
salaryScene.hears(EXIT_BTN_TEXT, leave<MyContext>())
salaryScene.on("message", ctx => ctx.replyWithMarkdown("Треба вибрати з кнопок"))
