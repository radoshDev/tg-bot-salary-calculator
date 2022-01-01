import { Scenes, Markup } from "telegraf"
import { reportSalaryBtn } from "../buttons/reportSalaryBtn"
import { MyContext } from "../types/spreadSheetTypes"

const { enter, leave } = Scenes.Stage

export const salaryScene = new Scenes.BaseScene<MyContext>("salary")
salaryScene.enter(async ctx => {
	return ctx.reply(
		"Вибери місяць:",
		Markup.keyboard(["Вихід", "Грудень 2021", "Січень 2022", "Лютий 2022"], { columns: 3 }).resize()
	)
})
salaryScene.leave(ctx => ctx.reply("Головне меню", reportSalaryBtn()))
salaryScene.hears("Грудень 2021", ctx => ctx.reply("В грудні ти заробила 2000грн, " + ctx.session.rows[0].revenue))
salaryScene.hears("Вихід", leave<MyContext>())
salaryScene.on("message", ctx => ctx.replyWithMarkdown("Треба вибрати з кнопок"))
