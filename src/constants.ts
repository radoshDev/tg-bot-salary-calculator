export enum Headers {
	date = "date",
	revenue = "revenue",
	dayIncome = "day_income",
	comment = "comment",
}
export const monthsByCode = {
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
export const FIXED_SALARY = 400
export const REPORT_SCENE_ID = "report"
export const SALARY_SCENE_ID = "salary"
export const ADVANCE_SCENE_ID = "advance"
export const REPORT_BTN_TEXT = "Звіт 🧾"
export const SALARY_BTN_TEXT = "Зарплата 🤑"
export const ADVANCE_BTN_TEXT = "Аванс 💸"
export const LOAD_BTN_TEXT = "Завантажую... 🚛"
export const EXIT_BTN_TEXT = "Вихід 🔙"
export const REVENUE_REG_EXP =
	/^((?<date>(вчора|позавчора|(\d{1,2}(\.\d{1,2})?(\.\d{2,4})?))+)\s+)?(?<revenue>\d{4,})(\s+(?<comment>[a-яіїє'0-9-.,]+))?/i
export const MONTH_REG_EXP = /([а-яі]{5,})\s(20[0-9]{2})/i
