"use strict";
exports.__esModule = true;
exports.ERROR_MSG_FUTURE_DATE = exports.ERROR_MSG_SHEET = exports.UNEXPECTED_MSG = exports.MONTH_REG_EXP = exports.REVENUE_REG_EXP = exports.EXIT_BTN_TEXT = exports.LOAD_BTN_TEXT = exports.ADVANCE_CANCEL_ID = exports.ADVANCE_ADD_ID = exports.ADVANCE_TEXT = exports.ADVANCE_BTN_TEXT = exports.ADVANCE_SCENE_ID = exports.SALARY_BTN_TEXT = exports.SALARY_SCENE_ID = exports.REPORT_BTN_TEXT = exports.REPORT_SCENE_ID = exports.FIXED_SALARY = exports.LOCALES = exports.monthsByCode = exports.Headers = void 0;
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
exports.LOCALES = "uk-UA";
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
exports.REVENUE_REG_EXP = /^((?<date>(вчора|позавчора|(\d{1,2}(\.\d{1,2})?(\.\d{2,4})?))+)\s+)?(?<revenue>\d{4,})(\s+(?<comment>[\d'-.a-яєії]+))?/i;
exports.MONTH_REG_EXP = /([а-яі]{5,})\s(20\d{2})/i;
var ERROR_MSG_PREFIX = "Халепа...😢";
var DEVELOPER = "@A_radosh";
var ERROR_MSG_SUFFIX = "\u0410 \u044F\u043A\u0449\u043E \u043D\u0435 \u0434\u043E\u043F\u043E\u043C\u043E\u0436\u0435, \u043D\u0430\u043F\u0438\u0448\u0438 \u0441\u044E\u0434\u0438 - " + DEVELOPER;
exports.UNEXPECTED_MSG = "\u0429\u043E\u0441\u044C \u043F\u0456\u0448\u043B\u043E \u043D\u0435 \u0442\u0430\u043A. \u0421\u043F\u0440\u043E\u0431\u0443\u0439 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0438 \u0431\u043E\u0442. " + ERROR_MSG_SUFFIX;
exports.ERROR_MSG_SHEET = ERROR_MSG_PREFIX + " \u0411\u0430\u0437\u0443 \u0434\u0430\u043D\u0438\u0445 \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E. \u0421\u043F\u0440\u043E\u0431\u0443\u0439 \u0437\u0443\u043F\u0438\u043D\u0438\u0442\u0438 \u0456 \u043F\u0435\u0440\u0435\u0437\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0438 \u043F\u0440\u043E\u0433\u0440\u0430\u043C\u0443. " + ERROR_MSG_SUFFIX;
exports.ERROR_MSG_FUTURE_DATE = ERROR_MSG_PREFIX + " \u041D\u0435 \u043C\u043E\u0436\u0443 \u0437\u0440\u043E\u0437\u0443\u043C\u0456\u0442\u0438 \u0434\u0430\u0442\u0443. \u0414\u043E\u0434\u0430\u0439, \u0431\u0443\u0434\u044C \u043B\u0430\u0441\u043A\u0430, \u0443 \u043F\u043E\u0432\u043D\u043E\u043C\u0443 \u0444\u043E\u0440\u043C\u0430\u0442\u0456. <i>(\u043F\u0440. <b>4.12.22</b> \u0430\u0431\u043E <b>4.12.2022</b>)</i>";
