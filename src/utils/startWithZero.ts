import { UNEXPECTED_MSG } from "../constants"

export function startWithZero(value: number | string): string {
	const numerable = Number(value)
	if (Number.isNaN(numerable) || numerable < 1) throw new Error(UNEXPECTED_MSG)
	const test = "Must be pushed to git"
	return numerable > 9 ? `${numerable}` : `0${numerable}`
}
