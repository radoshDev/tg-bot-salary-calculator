import { Markup, Scenes } from "telegraf"
import { mainMenuButtons } from "../buttons/mainMenuButtons"
import {
	ADVANCE_ADD_ID,
	ADVANCE_CANCEL_ID,
	ADVANCE_SCENE_ID,
	ADVANCE_TEXT,
	EXIT_BTN_TEXT,
	REVENUE_REG_EXP,
} from "../constants"
import { MyContext, SheetHeaders, SheetRow } from "../types/spreadSheetTypes"
import { parseDate } from "../utils/parseDate"
import { advanceConfirmButton } from "../buttons/advanceConfirmButton"
import { generateDateAdvanceText } from "../utils/generateDateAdvanceText"

const { leave } = Scenes.Stage

export const advanceScene = new Scenes.BaseScene<MyContext>(ADVANCE_SCENE_ID)
advanceScene.enter(async ctx => {
	return ctx.reply("Введи суму авансу", Markup.keyboard([EXIT_BTN_TEXT]).resize())
})
advanceScene.leave(ctx => ctx.reply("Головне меню", mainMenuButtons()))
advanceScene.hears(REVENUE_REG_EXP, async ctx => {
	try {
		if (!ctx.match.groups) throw new Error("Щось пішло не так. Спробуй по іншому записати дату")

		const { date: userDate, revenue: advance, comment: userComment } = ctx.match.groups
		const date = parseDate(userDate)
		const comment = `${ADVANCE_TEXT}${userComment ? ` | ${userComment}` : ""}`
		const monthYear = date.slice(3)
		const { sheet } = ctx.session
		const rows = await sheet.getRows()
		const isDBIncludeComment = (row: SheetRow): boolean =>
			!!row.date?.includes(monthYear) && !!row.comment?.includes(ADVANCE_TEXT)
		const currentMonthAdvance = rows.filter(row => isDBIncludeComment(row))

		if (currentMonthAdvance.length > 0) {
			ctx.session.advance = {
				date,
				revenue: "",
				day_income: advance,
				comment,
			}
			return ctx.replyWithHTML(
				`В даному місяці вже додано аванс\n${generateDateAdvanceText(currentMonthAdvance)}.\n Додати ще один?`,
				advanceConfirmButton(),
			)
		}

		await sheet.addRow({
			date,
			revenue: "",
			day_income: advance,
			comment,
		} as SheetHeaders)

		await ctx.replyWithHTML(`Аванс на <i>${date}</i> в сумі ${advance} грн додано.`)
		return ctx.scene.leave()
	} catch (_error) {
		const error = _error as Error
		return ctx.reply(error.message)
	}
})
advanceScene.hears(EXIT_BTN_TEXT, leave<MyContext>())
advanceScene.action(ADVANCE_ADD_ID, async ctx => {
	const { sheet } = ctx.session
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
advanceScene.action(ADVANCE_CANCEL_ID, async ctx => {
	await ctx.answerCbQuery()
	return leave<MyContext>()(ctx)
})
advanceScene.on("message", ctx => ctx.replyWithMarkdown("Потрібно ввести суму цифрам від 100 до 99999 грн"))
