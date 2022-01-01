export function startWithZero(value: number | string): string | number {
	if (typeof value === "string") value = Number(value)
	if (isNaN(value)) throw Error("Not a number")

	return value > 9 ? value : `0${value}`
}
