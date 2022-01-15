import { asMock } from "../../test/helper"
import { FIXED_SALARY } from "../constants"
import { calculateDayIncome } from "./calculateDayIncome"
import { parseDate } from "./parseDate"
import { parseUserText } from "./parseUserText"

jest.mock("./parseDate")
jest.mock("./calculateDayIncome")
const mockParseDate = asMock(parseDate)
const mockCalculateDayIncome = asMock(calculateDayIncome)

describe("Testing parseUserText.ts", () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	const revenue = "18500"
	const day_income = Math.floor(Number.parseInt(revenue) / 100 + FIXED_SALARY).toString()

	it("user send only revenue", () => {
		const date = "01.10.2021"
		mockParseDate.mockReturnValue(date)
		mockCalculateDayIncome.mockReturnValue(+day_income)
		const result = parseUserText(revenue)

		expect(parseDate).toHaveBeenCalledWith("")
		expect(parseDate).toHaveBeenCalledTimes(1)

		expect(calculateDayIncome).toHaveBeenCalledWith(revenue)
		expect(calculateDayIncome).toHaveBeenCalledTimes(1)
		expect(result).toEqual({ date, revenue, comment: "", day_income })
	})

	it("user send date as 'вчора' and revenue", () => {
		const date = "30.09.2021"
		mockParseDate.mockReturnValue(date)
		mockCalculateDayIncome.mockReturnValue(+day_income)
		const result = parseUserText(`вчора ${revenue}`)

		expect(parseDate).toHaveBeenCalledWith("вчора")
		expect(parseDate).toHaveBeenCalledTimes(1)

		expect(calculateDayIncome).toHaveBeenCalledWith(revenue)
		expect(calculateDayIncome).toHaveBeenCalledTimes(1)

		expect(result).toEqual({ date, revenue, comment: "", day_income })
	})

	it("user send date as 'позавчора' and revenue", () => {
		const date = "29.09.2021"
		mockParseDate.mockReturnValue(date)
		mockCalculateDayIncome.mockReturnValue(+day_income)
		const result = parseUserText(`позавчора ${revenue}`)

		expect(parseDate).toHaveBeenCalledWith("позавчора")
		expect(parseDate).toHaveBeenCalledTimes(1)

		expect(calculateDayIncome).toHaveBeenCalledWith(revenue)
		expect(calculateDayIncome).toHaveBeenCalledTimes(1)

		expect(result).toEqual({ date, revenue, comment: "", day_income })
	})
	it.todo("user send date as only day and revenue")
	it.todo("user send date as only day with zero start and revenue")
	it.todo("user send date as day-month and revenue")
	it.todo("user send date as day-month with zero start and revenue")
	it.todo("user send invalid string")
})
