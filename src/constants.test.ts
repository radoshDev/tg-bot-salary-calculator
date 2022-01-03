import { MONTH_REG_EXP } from "./constants"

describe("Check MONTH_REG_EXP", () => {
	it("pass correct month and year", () => {
		expect(MONTH_REG_EXP.test("Грудень 2021")).toBeTruthy()
	})
	it("pass correct in lower case month and year", () => {
		expect(MONTH_REG_EXP.test("жовтень 2021")).toBeTruthy()
	})
	it("pass incorrect month and correct year", () => {
		expect(MONTH_REG_EXP.test("Гру 2021")).toBeFalsy()
	})
	it("pass incorrect month and incorrect year", () => {
		expect(MONTH_REG_EXP.test("Чер 21")).toBeFalsy()
	})
})
