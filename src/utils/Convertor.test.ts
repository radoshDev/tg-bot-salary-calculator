import { Convertor } from "./Convertor"

describe("Testing code converter", () => {
	let code1 = "01"
	let code5 = "05"

	it("it return Січень", () => {
		expect(Convertor.codeToMonth(code1)).toBe("Січень")
	})

	it("it return Травень", () => {
		expect(Convertor.codeToMonth(code5)).toBe("Травень")
	})
})

describe("Testing month converter", () => {
	let code1 = "Жовтень"
	let code5 = "Лютий"

	it("it return 10", () => {
		expect(Convertor.monthToCode(code1)).toBe("10")
	})

	it("it return 02", () => {
		expect(Convertor.monthToCode(code5)).toBe("02")
	})
})
