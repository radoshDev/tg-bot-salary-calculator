"use strict";
exports.__esModule = true;
exports.ERROR_MSG_FUTURE_DATE = exports.ERROR_MSG_SHEET = exports.MONTH_REG_EXP = exports.REVENUE_REG_EXP = exports.EXIT_BTN_TEXT = exports.LOAD_BTN_TEXT = exports.ADVANCE_CANCEL_ID = exports.ADVANCE_ADD_ID = exports.ADVANCE_TEXT = exports.ADVANCE_BTN_TEXT = exports.ADVANCE_SCENE_ID = exports.SALARY_BTN_TEXT = exports.SALARY_SCENE_ID = exports.REPORT_BTN_TEXT = exports.REPORT_SCENE_ID = exports.FIXED_SALARY = exports.LOCALES = exports.monthsByCode = exports.Headers = void 0;
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
    "12": "Грудень"
};
exports.LOCALES = 'uk-UA';
exports.FIXED_SALARY = 400;
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
exports.REVENUE_REG_EXP = /^((?<date>(вчора|позавчора|(\d{1,2}(\.\d{1,2})?(\.\d{2,4})?))+)\s+)?(?<revenue>\d{4,})(\s+(?<comment>[a-яіїє'0-9-.,]+))?/i;
exports.MONTH_REG_EXP = /([а-яі]{5,})\s(20[0-9]{2})/i;
var ERROR_MSG_PREFIX = "Халепа...😢 ";
var ERROR_MSG_SUFFIX = " А якщо не допоможе, напиши сюди - @A_radosh";
exports.ERROR_MSG_SHEET = ERROR_MSG_PREFIX + "Базу даних не знайдено. Спробуй зупинити і перезагрузити програму." + ERROR_MSG_SUFFIX;
exports.ERROR_MSG_FUTURE_DATE = ERROR_MSG_PREFIX +
    "Не можу зрозуміти дату. Додай, будь ласка, у повному форматі. <i>(пр. <b>4.12.22</b> або <b>4.12.2022</b>)</i>";
