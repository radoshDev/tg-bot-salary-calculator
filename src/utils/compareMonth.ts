import { Rank } from "../types/common"
import { convertToUSDate } from "./convertToUSDate"

export function compareMonth(datableA: string, datableB: string, rank: Rank): number {
	const aDate = Date.parse(convertToUSDate(datableA))
	const bDate = Date.parse(convertToUSDate(datableB))
	if (isNaN(aDate) || isNaN(bDate)) throw Error("Pass not datable value")
	if (rank === "asc") return aDate - bDate
	if (rank === "desc") return bDate - aDate
	return 0
}
