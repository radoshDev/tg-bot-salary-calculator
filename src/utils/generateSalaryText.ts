import { SheetRow } from "../types/spreadSheetTypes"
import { calculateSalary } from "./calculateSalary"

export const generateSalaryText = (rows: SheetRow[], monthYear = "місяць"): string => {
	const summary = `\n\n<b>За <i>${monthYear}</i>:</b>`
	const totalSalarySum = calculateSalary(rows, "total")
	const advanceSum = calculateSalary(rows, "advance")
	const totalSalary = `\n🤑 <i>зароблено</i>: <b>${totalSalarySum}</b> грн`
	const advance = `\n💸 <i>отримано аванс</i>: <b>${advanceSum}</b> грн`
	const restSalary = `\n💵 <i>до сплати</i>: <b>${totalSalarySum - advanceSum}</b> грн`
	return summary + totalSalary + advance + restSalary
}
