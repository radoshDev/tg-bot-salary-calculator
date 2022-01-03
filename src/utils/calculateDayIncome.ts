import { FIXED_SALARY } from "../constants"

export function calculateDayIncome(revenue: number | string): number {
	return Math.floor(Number(revenue) / 100 + FIXED_SALARY)
}
