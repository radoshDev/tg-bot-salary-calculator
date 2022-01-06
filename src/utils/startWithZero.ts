export function startWithZero(value: number | string): string {
	if (typeof value === "string") value = Number(value)
	if (isNaN(value) || value < 1) throw new Error("Not valid number: " + value)

	return value > 9 ? `${value}` : `0${value}`
}
