export function convertToUsDate(datable: string): string {
	const [day, month, year] = datable.split(".")
	return `${month}.${day}.${year}`
}
