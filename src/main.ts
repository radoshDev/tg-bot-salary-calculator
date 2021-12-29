import { Telegraf } from "telegraf"
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet"
import { SheetHeaders } from "./types/spreadSheetTypes"
//reading ENV file
require("dotenv").config()
enum headers {
	date = "date",
	revenue = "revenue",
	dayIncome = "day_income",
	comment = "comment",
}

const bot = new Telegraf(process.env.TG_BOT_TOKEN as string)
const FIXED_SALARY = 400
start()
async function start() {
	try {
		const doc = await initSpreadSheet()
		const sheet = doc.sheetsByTitle["december"]

		bot.start(ctx => ctx.reply("Welcome"))
		bot.hears("зп", ctx =>
			ctx.replyWithMarkdown("В грудні ти заробила *10 000 грн*")
		)
		bot.on("text", async ctx => {
			const userInput = ctx.message.text
			const { date: inputDate, comment, revenue } = parseUserText(userInput)
			if (!revenue) {
				ctx.replyWithMarkdown(
					"Ти не вірно ввела виручку\n\nПриклад: *13000* або `дата` *13000*"
				)
				return
			}

			const date = parseDate(inputDate)
			const rows = await sheet.getRows()
			if (isExistInSheet(rows, { header: headers.date, value: date })) {
				const currentRow = rows.find(row => row[headers.date] === date)
				if (currentRow) {
					currentRow[headers.revenue] = revenue
					currentRow[headers.dayIncome] = `${calculateDayIncome(revenue)}`
					await currentRow.save()
					ctx.replyWithMarkdown(`Відредаговано за _${date}_`)
				}
				return
			}

			await sheet.addRow({
				date,
				revenue,
				day_income: `${calculateDayIncome(revenue)}`,
				comment,
			} as SheetHeaders)
			ctx.replyWithMarkdown(compliment(calculateDayIncome(revenue)))
		})
		bot.help(ctx => ctx.reply("Send me a sticker"))
		bot.on("sticker", ctx => ctx.reply("👍"))
		bot.launch()
	} catch (error) {}
}

async function initSpreadSheet() {
	const doc = new GoogleSpreadsheet(process.env.SPREADSHEET_ID as string)
	await doc.useServiceAccountAuth({
		client_email: process.env.SPREADSHEET_EMAIL as string,
		private_key: process.env.SPREADSHEET_PRIVATE_KEY!.replace(
			/\\n/g,
			"\n"
		) as string,
	})
	await doc.loadInfo()
	return doc
}
function parseUserText(inputText: string): Omit<SheetHeaders, "day_income"> {
	const regExp =
		/((?<date>([a-я]|(\d{1,2}(\.\d{1,2})?))+)\s+)?(?<revenue>\d{4,})(\s+(?<comment>\w+))?/i
	const groupeResult = inputText.match(regExp)
	return {
		date: groupeResult?.groups?.["date"] || "",
		revenue: groupeResult?.groups?.["revenue"] || "",
		comment: groupeResult?.groups?.["comment"] || "",
	}
}
function parseDate(date: string): string {
	const currentDate = new Date().toLocaleDateString()
	const [currentDay, currentMonth, currentYear] = currentDate.split(".")
	const [userDay, userMonth, userYear] = date?.split(".")

	if (date === "вчора") {
		return `${startWithZero(parseInt(currentDay) - 1)}.${startWithZero(
			currentMonth
		)}.${currentYear}`
	}
	if (date === "позавчора") {
		return `${startWithZero(parseInt(currentDay) - 2)}.${startWithZero(
			currentMonth
		)}.${currentYear}`
	}
	return `${startWithZero(userDay || currentDay)}.${startWithZero(
		userMonth || currentMonth
	)}.${userYear || currentYear}`
}
function calculateDayIncome(revenue: number | string): number {
	return +(Number(revenue) / 100 + FIXED_SALARY).toFixed(2)
}
function compliment(income: number) {
	if (income > 600) {
		return `Твій заробіток *${income} грн.*\n\n Ти молодець! Гарно попрацювала😘`
	}
	return `Твій заробіток *${income} грн.*\n\n Це теж не погано, молодчинка. Приїдеш додому я тобі зроблю чаю з ромашкою`
}
function isExistInSheet(
	rows: GoogleSpreadsheetRow[],
	option: { header: headers; value: string }
): boolean {
	return !!rows.find(row => row[option.header] === option.value)
}
function startWithZero(value: number | string): string | number {
	if (typeof value === "string") value = Number(value)
	if (isNaN(value)) throw Error("Not a number")

	return value > 9 ? value : `0${value}`
}
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))
