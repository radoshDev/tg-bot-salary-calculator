import { startWithZero } from "./startWithZero"

describe("Testing startWithZero.ts", () => {
	it("get string number less then 10", () => {
		expect(startWithZero("1")).toBe("01")
	})
	it("get string number greater then 9", () => {
		expect(startWithZero("11")).toBe("11")
	})
	it("get number less then 10", () => {
		expect(startWithZero(5)).toBe("05")
	})
	it("get number greater then 9", () => {
		expect(startWithZero(25)).toBe("25")
	})
	it("get invalid string", () => {
		expect(() => startWithZero("test")).toThrowError("Not valid number")
	})
	it("get string number less then 0", () => {
		expect(() => startWithZero("-3")).toThrowError("Not valid number")
	})
	it("get number is 0", () => {
		expect(() => startWithZero(0)).toThrowError("Not valid number")
	})
})
