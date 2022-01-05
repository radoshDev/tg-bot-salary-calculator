import { Markup, Scenes } from "telegraf"
import { mainMenuButtons } from "../buttons/mainMenuButtons"
import { ADVANCE_CANCEL_ID, ADVANCE_SCENE_ID, ADVANCE_TEXT, EXIT_BTN_TEXT, REVENUE_REG_EXP } from "../constants"
import { MyContext, SheetHeaders } from "../types/spreadSheetTypes"
import { rowWithValueInSheet } from "../utils/rowWithValueInSheet"
import { parseDate } from "../utils/parseDate"
import { advanceConfirmBtn } from "../buttons/advanceConfirmBtn"
import { ADVANCE_ADD_ID } from "./../constants"

const { enter, leave } = Scenes.Stage

export const advanceScene = new Scenes.BaseScene<MyContext>(ADVANCE_SCENE_ID)
advanceScene.enter(async ctx => {
	return ctx.reply("Введи суму авансу", Markup.keyboard([EXIT_BTN_TEXT]).resize())
})
advanceScene.leave(ctx => ctx.reply("Головне меню", mainMenuButtons()))
advanceScene.hears(REVENUE_REG_EXP, async ctx => {
	if (!ctx.match.groups) throw new Error("Groups does not exist in regular expression")

	const { date: userDate, revenue: advance, comment } = ctx.match.groups
	const date = parseDate(userDate)
	const sheet = ctx.session.sheet
	const rows = await sheet.getRows()
	const rowInSheet = rowWithValueInSheet(rows, { col: "comment", value: "аванс" })
	if (rowInSheet) {
		ctx.session.advance = {
			date,
			revenue: "",
			day_income: advance,
			comment: `${ADVANCE_TEXT}${comment ? " | " + comment : ""}`,
		}
		return ctx.replyWithHTML(
			`В даному місяці вже додано аванс <i>${rowInSheet.date}</i> - <b>${rowInSheet.day_income} грн</b>. Додати ще один?`,
			advanceConfirmBtn()
		)
	}

	await sheet.addRow({
		date,
		revenue: "",
		day_income: advance,
		comment: `${ADVANCE_TEXT}${comment ? " | " + comment : ""}`,
	} as SheetHeaders)

	await ctx.replyWithHTML(`Аванс на <i>${date}</i> в сумі ${advance} грн додано.`)
	return ctx.scene.leave()
})
advanceScene.hears(EXIT_BTN_TEXT, leave<MyContext>())
advanceScene.action(ADVANCE_ADD_ID, async ctx => {
	const sheet = ctx.session.sheet
	const { date, revenue, day_income: advance, comment } = ctx.session.advance
	await sheet.addRow({
		date,
		revenue,
		day_income: advance,
		comment,
	} as SheetHeaders)
	await ctx.answerCbQuery()
	await ctx.replyWithHTML(`Аванс на <i>${date}</i> в сумі ${advance} грн додано.`)
	return ctx.scene.leave()
})
advanceScene.action(ADVANCE_CANCEL_ID, leave<MyContext>())
advanceScene.on("message", ctx => ctx.replyWithMarkdown("Потрібно ввести суму цифрам від 100 до 99999 грн"))
