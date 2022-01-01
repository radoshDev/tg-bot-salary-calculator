import { Markup } from "telegraf"

export const reportSalaryBtn = () =>
	Markup.keyboard(["Зарплата", "Звіт"], {
		columns: 2,
	}).resize()
