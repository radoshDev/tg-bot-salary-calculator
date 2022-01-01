type Code = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12"
type Month =
	| "Січень"
	| "Лютий"
	| "Березень"
	| "Квітень"
	| "Травень"
	| "Червень"
	| "Липень"
	| "Серпень"
	| "Вересень"
	| "Жовтень"
	| "Листопад"
	| "Грудень"

export class Convertor {
	readonly base: { [key in Code]: Month } = {
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
	codeToMonth(code: Code) {
		return this.base[code]
	}
	monthToCode(month: Month) {
		const keys = Object.keys(this.base) as Code[]
		return keys.find(key => this.base[key] === month)
	}
}
