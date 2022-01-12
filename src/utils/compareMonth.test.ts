import { compareMonth } from "./compareMonth"

const mockSheetRows = [
	{ date: "31.12.2021", revenue: "15200", day_income: "552", comment: "" },
	{ date: "30.12.2021", revenue: "30600", day_income: "552", comment: "" },
	{ date: "29.12.2021", revenue: "15200", day_income: "552", comment: "" },
	{ date: "17.12.2021", revenue: "24500", day_income: "552", comment: "" },
	{ date: "24.12.2021", revenue: "15200", day_income: "552", comment: "" },
	{ date: "23.12.2021", revenue: "31300", day_income: "552", comment: "" },
	{ date: "19.12.2021", revenue: "24500", day_income: "552", comment: "" },
	{ date: "18.12.2021", revenue: "27800", day_income: "552", comment: "" },
]
const mockSortedAsc = [
	{ date: "17.12.2021", revenue: "24500", day_income: "552", comment: "" },
	{ date: "18.12.2021", revenue: "27800", day_income: "552", comment: "" },
	{ date: "19.12.2021", revenue: "24500", day_income: "552", comment: "" },
	{ date: "23.12.2021", revenue: "31300", day_income: "552", comment: "" },
	{ date: "24.12.2021", revenue: "15200", day_income: "552", comment: "" },
	{ date: "29.12.2021", revenue: "15200", day_income: "552", comment: "" },
	{ date: "30.12.2021", revenue: "30600", day_income: "552", comment: "" },
	{ date: "31.12.2021", revenue: "15200", day_income: "552", comment: "" },
]
const mockSortedDesc = [
	{ date: "31.12.2021", revenue: "15200", day_income: "552", comment: "" },
	{ date: "30.12.2021", revenue: "30600", day_income: "552", comment: "" },
	{ date: "29.12.2021", revenue: "15200", day_income: "552", comment: "" },
	{ date: "24.12.2021", revenue: "15200", day_income: "552", comment: "" },
	{ date: "23.12.2021", revenue: "31300", day_income: "552", comment: "" },
	{ date: "19.12.2021", revenue: "24500", day_income: "552", comment: "" },
	{ date: "18.12.2021", revenue: "27800", day_income: "552", comment: "" },
	{ date: "17.12.2021", revenue: "24500", day_income: "552", comment: "" },
]
describe("Testing startWithZero.ts", () => {
	const list = ["12.2021", "01.2022", "11.2021", "02.2022", "01.2023"]
	const sortedAsc = ["11.2021", "12.2021", "01.2022", "02.2022", "01.2023"]
	const sortedDesc = ["01.2023", "02.2022", "01.2022", "12.2021", "11.2021"]

	it("sort array of strings by descending", () => {
		expect([...list].sort((a, b) => compareMonth(`01.${a}`, `01.${b}`, "desc"))).toEqual(sortedDesc)
	})
	it("sort array of strings by ascension", () => {
		expect([...list].sort((a, b) => compareMonth(`01.${a}`, `01.${b}`, "asc"))).toEqual(sortedAsc)
	})
	it("sort array of SheetRow by ascension", () => {
		expect(mockSheetRows.sort((a, b) => compareMonth(a.date, b.date, "asc"))).toEqual(mockSortedAsc)
	})
	it("sort array of SheetRow by descending", () => {
		expect(mockSheetRows.sort((a, b) => compareMonth(a.date, b.date, "desc"))).toEqual(mockSortedDesc)
	})
	it("get invalid datable string", () => {
		expect(() => compareMonth("122.2012", "1222.2012", "desc")).toThrowError("Pass not datable value")
	})
})
