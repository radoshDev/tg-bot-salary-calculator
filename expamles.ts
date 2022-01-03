import { compareMonth } from "./src/utils/compareMonth"
type Rank = "asc" | "desc"
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

/* function compCb(datableA, datableB, rank: Rank) {
	const aDate = Date.parse(convertToUSDate(datableA))
	const bDate = Date.parse(convertToUSDate(datableB))
	if (rank === "asc") return aDate - bDate
	if (rank === "desc") return bDate - aDate
	return 0
} */

mockSheetRows.sort((a, b) => compareMonth(a.date, b.date, "asc")) //?
