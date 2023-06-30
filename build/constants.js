"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_MSG_FUTURE_DATE = exports.ERROR_MSG_SHEET = exports.UNEXPECTED_MSG = exports.MONTH_REG_EXP = exports.REVENUE_REG_EXP = exports.MORE_BTN_TEXT = exports.EXIT_BTN_TEXT = exports.LOAD_BTN_TEXT = exports.ADVANCE_CANCEL_ID = exports.ADVANCE_ADD_ID = exports.ADVANCE_TEXT = exports.ADVANCE_BTN_TEXT = exports.ADVANCE_SCENE_ID = exports.SALARY_BTN_TEXT = exports.SALARY_SCENE_ID = exports.REPORT_BTN_TEXT = exports.REPORT_SCENE_ID = exports.MAX_MONTHS = exports.FIXED_SALARY = exports.LOCALES = exports.monthsByCode = exports.Headers = exports.ALLOWED_USER_LIST = void 0;
// eslint-disable-next-line unicorn/numeric-separators-style
exports.ALLOWED_USER_LIST = [863952181, 365704277];
var Headers;
(function (Headers) {
    Headers["date"] = "date";
    Headers["revenue"] = "revenue";
    Headers["dayIncome"] = "day_income";
    Headers["comment"] = "comment";
})(Headers = exports.Headers || (exports.Headers = {}));
exports.monthsByCode = {
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
};
exports.LOCALES = "uk-UA";
exports.FIXED_SALARY = 500;
exports.MAX_MONTHS = 4;
exports.REPORT_SCENE_ID = "report";
exports.REPORT_BTN_TEXT = "Звіт 🧾";
exports.SALARY_SCENE_ID = "salary";
exports.SALARY_BTN_TEXT = "Зарплата 🤑";
exports.ADVANCE_SCENE_ID = "advance";
exports.ADVANCE_BTN_TEXT = "Аванс 💸";
exports.ADVANCE_TEXT = "аванс";
exports.ADVANCE_ADD_ID = "add";
exports.ADVANCE_CANCEL_ID = "cancel";
exports.LOAD_BTN_TEXT = "Завантажую... 🚛";
exports.EXIT_BTN_TEXT = "Вихід 🔙";
exports.MORE_BTN_TEXT = "Ще ➕";
exports.REVENUE_REG_EXP = /^((?<date>(вчора|позавчора|(\d{1,2}(\.\d{1,2})?(\.\d{2,4})?))+)\s+)?(?<revenue>\d{3,})(\s+(?<comment>[\d'-.a-яєії]+))?/i;
exports.MONTH_REG_EXP = /([а-яі]{5,})\s(20\d{2})/i;
const ERROR_MSG_PREFIX = "Халепа...😢";
const DEVELOPER = "@A_radosh";
const ERROR_MSG_SUFFIX = `А якщо не допоможе, напиши сюди - ${DEVELOPER}`;
exports.UNEXPECTED_MSG = `Щось пішло не так. Спробуй перезагрузити бот. ${ERROR_MSG_SUFFIX}`;
exports.ERROR_MSG_SHEET = `${ERROR_MSG_PREFIX} Базу даних не знайдено. Спробуй зупинити і перезагрузити програму. ${ERROR_MSG_SUFFIX}`;
exports.ERROR_MSG_FUTURE_DATE = `${ERROR_MSG_PREFIX} Не можу зрозуміти дату. Додай, будь ласка, у повному форматі. <i>(пр. <b>4.12.22</b> або <b>4.12.2022</b>)</i>`;
