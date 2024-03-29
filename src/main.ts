import { Telegraf, session } from "telegraf"
import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from "google-spreadsheet"
import { config } from "dotenv"
import { stage } from "./scenes"
import { mainMenuButtons } from "./buttons/mainMenuButtons"
import { compliment } from "./utils/compliment"
import { rowWithDateInSheet } from "./utils/rowWithDateInSheet"
import { parseUserText } from "./utils/parseUserText"
import {
	REVENUE_REG_EXP,
	Headers,
	SALARY_SCENE_ID,
	REPORT_SCENE_ID,
	SALARY_BTN_TEXT,
	REPORT_BTN_TEXT,
	ADVANCE_BTN_TEXT,
	ADVANCE_SCENE_ID,
	LOAD_BTN_TEXT,
	ERROR_MSG_SHEET,
	ADVANCE_TEXT,
	EXIT_BTN_TEXT,
} from "./constants"
import { loaderButton } from "./buttons/loaderButton"
import { calculateDayIncome } from "./utils/calculateDayIncome"
import { MyContext, SheetHeaders, SheetRow } from "./types/spreadSheetTypes"
import { parseDate } from "./utils/parseDate"
import { isAllowUser } from "./utils/isAllowUser"

config()
const token = process.env.SB_BOT_TOKEN

if (!token) throw new Error("BOT_TOKEN must be provided!")

const bot = new Telegraf<MyContext>(token)

start()

async function start(): Promise<void> {
	const doc = await initSpreadSheet()
	bot.use(session())
	bot.use(stage.middleware())
	bot.use((ctx, next) => {
		const userId = ctx.message?.from.id
		if (userId && !isAllowUser(userId)) {
			console.log(userId)
			return ctx.reply("Sorry. You not allowed user")
		}
		return next()
	})

	bot.start(async ctx => {
		const title = getSheetTitle(ctx)
		const sheet = doc.sheetsByTitle[title]
		if (!sheet) {
			await generateSheet(doc, title)
		}
		return ctx.reply("Вітаю в Калькуляторі зарплати", mainMenuButtons())
	})
	bot.hears(SALARY_BTN_TEXT, async ctx => {
		try {
			ctx.reply(LOAD_BTN_TEXT, loaderButton())
			const user = ctx.message.from.username || ctx.message.from.first_name + ctx.message.from.id
			const sheet = doc.sheetsByTitle[user || "default"]

			if (!sheet) throw new Error(ERROR_MSG_SHEET)

			ctx.session.rows = await sheet.getRows()
			return ctx.scene.enter(SALARY_SCENE_ID)
		} catch (error_) {
			const error = error_ as Error
			return ctx.replyWithHTML(error.message)
		}
	})
	bot.hears(REPORT_BTN_TEXT, async ctx => {
		try {
			ctx.reply(LOAD_BTN_TEXT, loaderButton())
			const title = getSheetTitle(ctx)
			const sheet = doc.sheetsByTitle[title]

			if (!sheet) throw new Error(ERROR_MSG_SHEET)

			ctx.session.rows = await sheet.getRows()
			return ctx.scene.enter(REPORT_SCENE_ID)
		} catch (error_) {
			const error = error_ as Error
			return ctx.replyWithHTML(error.message)
		}
	})
	bot.hears(ADVANCE_BTN_TEXT, async ctx => {
		try {
			const title = getSheetTitle(ctx)
			const sheet = doc.sheetsByTitle[title]

			if (!sheet) throw new Error(ERROR_MSG_SHEET)

			ctx.session.sheet = sheet
			return ctx.scene.enter(ADVANCE_SCENE_ID)
		} catch (error_) {
			const error = error_ as Error
			return ctx.replyWithHTML(error.message)
		}
	})
	bot.hears(REVENUE_REG_EXP, async ctx => {
		try {
			const userInput = ctx.message.text
			const { date, comment, revenue, day_income } = parseUserText(userInput)
			const title = getSheetTitle(ctx)
			const sheet = doc.sheetsByTitle[title]

			if (!sheet) throw new Error(ERROR_MSG_SHEET)

			const rows: SheetRow[] = await sheet.getRows()
			const rowInDB = rowWithDateInSheet(rows, date)

			if (rowInDB && !rowInDB.comment?.includes(ADVANCE_TEXT)) {
				rowInDB.revenue = revenue
				rowInDB.day_income = day_income
				rowInDB.comment = comment
				await rowInDB.save()
				return ctx.replyWithHTML(
					`Відредаговано за <i>${date}</i>.\n\n Заробіток у цей день: <b>${calculateDayIncome(revenue)} грн</b>`,
				)
			}
			const rowValue: SheetHeaders = {
				date,
				revenue,
				day_income,
				comment,
			}
			await sheet.addRow(rowValue)

			return ctx.replyWithHTML(
				`Твій заробіток за <i>${date === parseDate("") ? "сьогодні" : date}</i> - <b>${day_income} грн.</b>${compliment(
					Number(day_income),
				)}`,
			)
		} catch (error_) {
			const error = error_ as Error
			return ctx.replyWithHTML(error.message)
		}
	})
	bot.help(ctx => ctx.reply("Send me a sticker"))
	bot.command("db", async ctx =>
		ctx.replyWithHTML(
			"<a href='https://docs.google.com/spreadsheets/d/1MkRAS_yyHMFRvZiKKbmyAAe1Nzc6wFopAJ9WciCvMpQ/edit#gid=0'>База даних</a>",
		),
	)
	bot.hears(EXIT_BTN_TEXT, ctx => {
		ctx.replyWithHTML(`Натисни ще раз ${EXIT_BTN_TEXT}`)
		return ctx.scene.enter(REPORT_SCENE_ID)
	})
	bot.on("message", ctx => {
		return ctx.replyWithHTML(
			"<u>Не вірно введена виручка</u>\n<i>Приклад:</i>\n<b>23000</b>\n---або---\n<b>вчора 25700</b>\n---або---\n<b>21.01 35800</b>",
		)
	})
	bot.launch()
	console.log("Bot is running!")
}
async function initSpreadSheet(): Promise<GoogleSpreadsheet> {
	if (!process.env.SB_SPREADSHEET_ID) throw new Error("Spreadsheet ID not passed!")
	const doc = new GoogleSpreadsheet(process.env.SB_SPREADSHEET_ID)
	const clientEmail = process.env.SB_SPREADSHEET_EMAIL
	const privateKey = process.env.SB_SPREADSHEET_PRIVATE_KEY?.replace(/\\n/g, "\n")
	if (!clientEmail) throw new Error("SPREADSHEET_EMAIL must be provided!")
	if (!privateKey) throw new Error("SPREADSHEET_PRIVATE_KEY must be provided!")

	await doc.useServiceAccountAuth({
		client_email: clientEmail,
		private_key: privateKey,
	})
	await doc.loadInfo()
	return doc
}
async function generateSheet(doc: GoogleSpreadsheet, title: string): Promise<GoogleSpreadsheetWorksheet> {
	const newSheet = await doc.addSheet({ headerValues: Object.values(Headers), title })
	return newSheet
}
function getSheetTitle(ctx: MyContext): string {
	const userName = ctx.message?.from?.username
	const firstName = ctx.message?.from?.first_name || "Unknown"
	const userId = ctx.message?.from.id || Date.now()
	const title = userName || firstName + userId

	return title
}
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))
