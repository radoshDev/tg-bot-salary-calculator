import { calculateDayIncome } from "./calculateDayIncome"
import { parseDate } from "./parseDate"
import { parseUserText } from "./parseUserText"

describe("Testing parseUserText.ts", () => {
	const revenue = "18500"
	const dayIncome = calculateDayIncome(revenue).toString()
	const date = "11.05.2022"
	const comment = "Покровська"

	it("user send only revenue", () => {
		const date = parseDate("")
		expect(parseUserText(revenue)).toEqual({ date, revenue, comment: "", day_income: dayIncome })
	})
	it("user send date as 'вчора' and revenue", () => {
		const date = parseDate("вчора")
		expect(parseUserText("вчора " + revenue)).toEqual({ date, revenue, comment: "", day_income: dayIncome })
	})
	it("user send date as 'позавчора' and revenue", () => {
		const date = parseDate("позавчора")
		expect(parseUserText("позавчора " + revenue)).toEqual({ date, revenue, comment: "", day_income: dayIncome })
	})
})
