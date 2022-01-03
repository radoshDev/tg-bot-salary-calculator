import { calculateDayIncome } from "./calculateDayIncome"

describe("Testing calculateDayIncome.ts", () => {
	it("get correct string revenue", () => {
		expect(calculateDayIncome("18550")).toBe(585)
	})
	it("get correct number revenue", () => {
		expect(calculateDayIncome(18500)).toBe(585)
	})
	it("get incorrect number revenue", () => {
		expect(calculateDayIncome("bla")).toBe(NaN)
	})
})
