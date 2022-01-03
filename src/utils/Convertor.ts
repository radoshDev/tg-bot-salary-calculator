export class Convertor {
	static readonly base: { [key: string]: string } = {
		"01": "Січень",
		"02": "Лютий",
		"03": "Березень",
		"04": "Квітень",
		"05": "Травень",
		"06": "Червень",
		"07": "Липень",
		"08": "Серпень",
		"09": "Вересень",
		"10": "Жовтень",
		"11": "Листопад",
		"12": "Грудень",
	}
	static codeToMonth(code: string) {
		return this.base[code] || "Помилка дати"
	}
	static monthToCode(month: string) {
		const monthsCodes = Object.keys(this.base)
		return monthsCodes.find(code => this.base[code] === month)
	}
}
