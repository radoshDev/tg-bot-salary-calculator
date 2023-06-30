// eslint-disable-next-line unicorn/numeric-separators-style
export const ALLOWED_USER_LIST: number[] = [863952181, 365704277]

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
export const LOCALES = "uk-UA"
export const FIXED_SALARY = 500
export const MAX_MONTHS = 4

export const REPORT_SCENE_ID = "report"
export const REPORT_BTN_TEXT = "Звіт 🧾"
export const SALARY_SCENE_ID = "salary"
export const SALARY_BTN_TEXT = "Зарплата 🤑"
export const ADVANCE_SCENE_ID = "advance"
export const ADVANCE_BTN_TEXT = "Аванс 💸"
export const ADVANCE_TEXT = "аванс"
export const ADVANCE_ADD_ID = "add"
export const ADVANCE_CANCEL_ID = "cancel"
export const LOAD_BTN_TEXT = "Завантажую... 🚛"
export const EXIT_BTN_TEXT = "Вихід 🔙"
export const MORE_BTN_TEXT = "Ще ➕"

export const REVENUE_REG_EXP =
	/^((?<date>(вчора|позавчора|(\d{1,2}(\.\d{1,2})?(\.\d{2,4})?))+)\s+)?(?<revenue>\d{3,})(\s+(?<comment>[\d'-.a-яєії]+))?/i
export const MONTH_REG_EXP = /([а-яі]{5,})\s(20\d{2})/i

const ERROR_MSG_PREFIX = "Халепа...😢"
const DEVELOPER = "@A_radosh"
const ERROR_MSG_SUFFIX = `А якщо не допоможе, напиши сюди - ${DEVELOPER}`
export const UNEXPECTED_MSG = `Щось пішло не так. Спробуй перезагрузити бот. ${ERROR_MSG_SUFFIX}`
export const ERROR_MSG_SHEET = `${ERROR_MSG_PREFIX} Базу даних не знайдено. Спробуй зупинити і перезагрузити програму. ${ERROR_MSG_SUFFIX}`
export const ERROR_MSG_FUTURE_DATE = `${ERROR_MSG_PREFIX} Не можу зрозуміти дату. Додай, будь ласка, у повному форматі. <i>(пр. <b>4.12.22</b> або <b>4.12.2022</b>)</i>`
