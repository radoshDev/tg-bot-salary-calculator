import { LOCALES } from "../constants"
import { parseDate } from "./parseDate"

describe("Testing parseDate.ts", () => {
	const timeStamp = Date.now()
	const dayStamp = 24 * 60 * 60 * 1000
	const currentLocalDate = new Date().toLocaleDateString(LOCALES)
	const [_currentDay, currentMonth, currentYear] = currentLocalDate.split(".")

	it("pass empty string", () => {
		expect(parseDate("")).toBe(currentLocalDate)
	})
	it("pass word 'вчора'", () => {
		const yesterdayTimeStamp = timeStamp - dayStamp
		const yesterdayLocalDate = new Date(yesterdayTimeStamp).toLocaleDateString(LOCALES)
		expect(parseDate("вчора")).toBe(yesterdayLocalDate)
	})
	it("pass word 'позавчора'", () => {
		const beforeYesterdayTimeStamp = timeStamp - dayStamp - dayStamp
		const beforeYesterdayLocalDate = new Date(beforeYesterdayTimeStamp).toLocaleDateString(LOCALES)
		expect(parseDate("позавчора")).toBe(beforeYesterdayLocalDate)
	})
	it("get only day without zero start", () => {
		expect(parseDate("5")).toBe(`05.${currentMonth}.${currentYear}`)
	})
	it("get only day with zero start", () => {
		expect(parseDate("05")).toBe(`05.${currentMonth}.${currentYear}`)
	})
	it("pass date without year for current year with zero start", () => {
		expect(parseDate("02.01")).toBe("02.01.2022")
	})
	it("pass date without year for current year without zero start", () => {
		expect(parseDate("5.1")).toBe("05.01.2022")
	})
	it("pass date for current year with zero start", () => {
		expect(parseDate("02.01.2022")).toBe("02.01.2022")
	})
	it("pass date for current year without zero start", () => {
		expect(parseDate("5.1.22")).toBe("05.01.2022")
	})
})
