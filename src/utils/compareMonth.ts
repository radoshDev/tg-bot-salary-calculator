import { Rank } from "../types/common"
import { convertToUsDate } from "./convertToUsDate"

export function compareMonth(datableA: string | undefined, datableB: string | undefined, rank: Rank): number {
	if (!datableA || !datableB) return 0

	const aDate = Date.parse(convertToUsDate(datableA))
	const bDate = Date.parse(convertToUsDate(datableB))
	if (Number.isNaN(aDate) || Number.isNaN(bDate)) throw new Error("Pass not datable value")
	if (rank === "asc") return aDate - bDate
	if (rank === "desc") return bDate - aDate
	return 0
}
