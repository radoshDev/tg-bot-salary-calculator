import { Telegraf, Scenes, Markup, session } from "telegraf"
import { GoogleSpreadsheet, GoogleSpreadsheetRow, GoogleSpreadsheetWorksheet } from "google-spreadsheet"
import { MyContext, SheetHeaders, SheetRow } from "./types/spreadSheetTypes"
import { stage } from "./scenes"
import { reportSalaryBtn } from "./buttons/reportSalaryBtn"
import { compliment } from "./utils/compliment"
import { isValueExist } from "./utils/isValueExist"
import { generateReportText } from "./utils/generateReportText"
import { parseUserText } from "./utils/parseUserText"
//reading ENV file
require("dotenv").config()
enum Headers {
	date = "date",
	revenue = "revenue",
	dayIncome = "day_income",
	comment = "comment",
}

const revenueReg = /^([а-я0-9.]+ )?\d{5,}(\s+[а-я0-9-.,]+)?/i //вчора 15000 Покровська
const token = process.env.TG_BOT_TOKEN
if (!token) throw Error("BOT_TOKEN must be provided!")

const bot = new Telegraf<MyContext>(token)
start()
async function start() {
	try {
		const doc = await initSpreadSheet()
		let sheet: GoogleSpreadsheetWorksheet | undefined
		bot.use(session())
		bot.use(stage.middleware())
		bot.start(async ctx => {
			sheet = doc.sheetsByTitle[ctx.message.from.username || "default"]
			sheet ??= await generateSheet(doc, ctx.message.from.username)

			return ctx.reply("Вітаю в Калькуляторі зарплати", reportSalaryBtn())
		})
		bot.hears("Зарплата", async ctx => {
			if (!sheet) return console.log("Error from Зарплата")
			ctx.session.rows = await sheet.getRows()

			return await ctx.scene.enter("salary")
		})
		bot.hears("Звіт", async ctx => {
			if (!sheet) return console.log("something wrong")
			const rows: SheetRow[] = await sheet.getRows()
			return ctx.replyWithHTML(generateReportText(rows))
		})
		bot.hears(revenueReg, async ctx => {
			const userInput = ctx.message.text
			const { date, comment, revenue, day_income } = parseUserText(userInput)

			if (!sheet) return console.log("Problem with sheet")

			const rows: SheetRow[] = await sheet.getRows()

			if (isValueExist(rows, { col: "date", value: date })) {
				const currentRow = rows.find(row => row.date === date)!
				currentRow.revenue = revenue
				currentRow.day_income = day_income
				currentRow.comment = comment
				await currentRow.save()
				ctx.replyWithMarkdown(`Відредаговано за _${date}_`)
				return
			}

			await sheet.addRow({
				date,
				revenue,
				day_income,
				comment,
			} as SheetHeaders)
			return ctx.replyWithMarkdown(compliment(Number(day_income)))
		})
		bot.help(ctx => ctx.reply("Send me a sticker"))
		bot.command("db", async ctx =>
			ctx.replyWithHTML(
				"<a href='https://docs.google.com/spreadsheets/d/1MkRAS_yyHMFRvZiKKbmyAAe1Nzc6wFopAJ9WciCvMpQ/edit#gid=0'>База даних</a>"
			)
		)
		bot.on("message", ctx =>
			ctx.replyWithHTML(
				"<u>Не вірно введена виручка</u>\n<i>Приклад:</i>\n<b>23000</b>\n---або---\n<b>вчора 25700</b>\n---або---\n<b>21.01 35800</b>"
			)
		)
		bot.launch()
	} catch (error) {}
}
async function initSpreadSheet() {
	const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID as string)
	await doc.useServiceAccountAuth({
		client_email: process.env.SPREADSHEET_EMAIL as string,
		private_key: process.env.SPREADSHEET_PRIVATE_KEY!.replace(/\\n/g, "\n") as string,
	})
	await doc.loadInfo()
	return doc
}
async function generateSheet(doc: GoogleSpreadsheet, userId = "unknown") {
	const newSheet = await doc.addSheet({ headerValues: Object.values(Headers), title: userId })
	return newSheet
}

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))
