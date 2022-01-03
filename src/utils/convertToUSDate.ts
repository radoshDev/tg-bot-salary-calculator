export function convertToUSDate(datable: string) {
	const [day, month, year] = datable.split(".")
	return `${month}.${day}.${year}`
}
