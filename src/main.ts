import { Telegraf, session } from "telegraf"
import { GoogleSpreadsheet } from "google-spreadsheet"
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
} from "./constants"
import { loaderButton } from "./buttons/loaderButton"
import { calculateDayIncome } from "./utils/calculateDayIncome"
import { MyContext, SheetHeaders, SheetRow } from "./types/spreadSheetTypes"

config()
const token = process.env.TG_BOT_TOKEN
if (!token) throw new Error("BOT_TOKEN must be provided!")

const bot = new Telegraf<MyContext>(token)
start()
async function start() {
	try {
		const doc = await initSpreadSheet()
		bot.use(session())
		bot.use(stage.middleware())
		bot.start(async ctx => {
			const title = getSheetTitle(ctx)
			const sheet = doc.sheetsByTitle[title]
			if (!sheet) {
				await generateSheet(doc, title)
			}
			return ctx.reply("Вітаю в Калькуляторі зарплати", mainMenuButtons())
		})
		bot.hears(SALARY_BTN_TEXT, async ctx => {
			ctx.reply(LOAD_BTN_TEXT, loaderButton())
			const user = ctx.message.from.username || ctx.message.from.first_name + ctx.message.from.id
			const sheet = doc.sheetsByTitle[user || "default"]

			if (!sheet) return console.log("Error from Зарплата")

			ctx.session.rows = await sheet.getRows()
			return ctx.scene.enter(SALARY_SCENE_ID)
		})
		bot.hears(REPORT_BTN_TEXT, async ctx => {
			ctx.reply(LOAD_BTN_TEXT, loaderButton())
			const title = getSheetTitle(ctx)
			const sheet = doc.sheetsByTitle[title]

			if (!sheet) throw new Error(ERROR_MSG_SHEET)

			ctx.session.rows = await sheet.getRows()
			return ctx.scene.enter(REPORT_SCENE_ID)
		})
		bot.hears(ADVANCE_BTN_TEXT, async ctx => {
			const title = getSheetTitle(ctx)
			const sheet = doc.sheetsByTitle[title]

			if (!sheet) throw new Error(ERROR_MSG_SHEET)

			ctx.session.sheet = sheet
			return ctx.scene.enter(ADVANCE_SCENE_ID)
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

				await sheet.addRow({
					date,
					revenue,
					day_income,
					comment,
				} as SheetHeaders)

				return ctx.replyWithMarkdown(compliment(Number(day_income)))
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
		bot.on("message", ctx => {
			console.log(ctx.from)
			return ctx.replyWithHTML(
				"<u>Не вірно введена виручка</u>\n<i>Приклад:</i>\n<b>23000</b>\n---або---\n<b>вчора 25700</b>\n---або---\n<b>21.01 35800</b>",
			)
		})
		bot.launch()
	} catch (error) {
		console.log(error)
	}
}
async function initSpreadSheet() {
	const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID as string)
	await doc.useServiceAccountAuth({
		client_email: process.env.SPREADSHEET_EMAIL as string,
		private_key: process.env.SPREADSHEET_PRIVATE_KEY.replace(/\\n/g, "\n") as string,
	})
	await doc.loadInfo()
	return doc
}
async function generateSheet(doc: GoogleSpreadsheet, title: string) {
	const newSheet = await doc.addSheet({ headerValues: Object.values(Headers), title })
	return newSheet
}
function getSheetTitle(ctx: MyContext): string {
	const userName = ctx.message?.from?.username
	const firstName = ctx.message?.from?.first_name || "Unknown"
	const userId = ctx.message?.from.id || new Date()
	const title = userName || firstName + userId

	return title
}
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))
