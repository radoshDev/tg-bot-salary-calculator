import { Telegraf, Context, Markup } from "telegraf"
import { GoogleSpreadsheet, GoogleSpreadsheetRow } from "google-spreadsheet"
import { SheetHeaders, SheetRow } from "./types/spreadSheetTypes"
//reading ENV file
require("dotenv").config()

const FIXED_SALARY = 400
const token = process.env.TG_BOT_TOKEN
if (!token) throw Error("BOT_TOKEN must be provided!")

const bot = new Telegraf(token)
start()
async function start() {
	try {
		const doc = await initSpreadSheet()
		const sheet = doc.sheetsByTitle["december"]

		bot.start(ctx =>
			ctx.reply(
				"Вітаю в Калькуляторі зарплати",
				Markup.keyboard([Markup.button.callback("Зарплата", "salary")]).resize()
			)
		)
		bot.action("salary", async ctx => {
			ctx.reply("Хоч зп?")
		})
		bot.hears("зп", async ctx => {
			const rows = await sheet.getRows()
			const salary = calculateMonthSalary(rows)

			ctx.replyWithMarkdown(`В грудні ти заробила *${salary} грн*`)
		})
		bot.hears("звіт", async ctx => {
			const rows: SheetRow[] = await sheet.getRows()
			ctx.replyWithMarkdown(
				`_${rows[0].date}_ - *${rows[0].day_income} грн*\n_${rows[1].date}_ - *${
					rows[1].day_income
				} грн*\n\n*Разом: ${calculateMonthSalary(rows)} грн*`
			)
		})
		bot.on("text", async ctx => {
			const userInput = ctx.message.text
			const { date: inputDate, comment, revenue } = parseUserText(userInput)
			if (!revenue) {
				ctx.replyWithMarkdown("Ти не вірно ввела виручку\n\nПриклад: *13000* або `дата` *13000*")
				return
			}

			const date = parseDate(inputDate)
			const rows: SheetRow[] = await sheet.getRows()
			if (isValueExist(rows, { col: "date", value: date })) {
				const currentRow = rows.find(row => row.date === date)!
				currentRow.revenue = revenue
				currentRow.day_income = `${calculateDayIncome(revenue)}`
				await currentRow.save()
				ctx.replyWithMarkdown(`Відредаговано за _${date}_`)
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
		private_key: process.env.SPREADSHEET_PRIVATE_KEY!.replace(/\\n/g, "\n") as string,
	})
	await doc.loadInfo()
	return doc
}
function parseUserText(inputText: string): Omit<SheetHeaders, "day_income"> {
	const regExp = /((?<date>([a-я]|(\d{1,2}(\.\d{1,2})?))+)\s+)?(?<revenue>\d{4,})(\s+(?<comment>\w+))?/i
	const groupeResult = inputText.match(regExp)
	return {
		date: groupeResult?.groups?.["date"] || "",
		revenue: groupeResult?.groups?.["revenue"] || "",
		comment: groupeResult?.groups?.["comment"] || "",
	}
}
function parseDate(date: string): string {
	const currentDate = new Date()
	if (date === "вчора") currentDate.setDate(currentDate.getDate() - 1)
	if (date === "позавчора") currentDate.setDate(currentDate.getDate() - 2)

	const [currentDay, currentMonth, currentYear] = currentDate.toLocaleDateString().split(".")
	const [userDay, userMonth, userYear] = date.split(".")
	const day = startWithZero(/\d/.test(userDay) ? userDay : currentDay)
	const month = startWithZero(userMonth || currentMonth)
	const year = startWithZero(userYear || currentYear)

	return `${day}.${month}.${year}`
}
function calculateDayIncome(revenue: number | string): number {
	return +(Number(revenue) / 100 + FIXED_SALARY).toFixed(2)
}
function calculateMonthSalary(rows: SheetRow[]): number {
	return rows.reduce((sum, row) => sum + Number(row.day_income), 0)
}
function compliment(income: number) {
	if (income > 600) {
		return `Твій заробіток *${income} грн.*\n\n Ти молодець! Гарно попрацювала😘`
	}
	return `Твій заробіток *${income} грн.*\n\n Це теж не погано, молодчинка. Приїдеш додому я тобі зроблю чаю з ромашкою`
}
function isValueExist(rows: SheetRow[], { col, value }: { col: keyof SheetHeaders; value: string }): boolean {
	return !!rows.find(row => row[col] === value)
}
function startWithZero(value: number | string): string | number {
	if (typeof value === "string") value = Number(value)
	if (isNaN(value)) throw Error("Not a number")

	return value > 9 ? value : `0${value}`
}
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))
