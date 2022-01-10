"use strict";
exports.__esModule = true;
exports.parseDate = void 0;
var constants_1 = require("../constants");
var startWithZero_1 = require("./startWithZero");
function parseDate(date) {
    if (!date)
        return new Date().toLocaleDateString(constants_1.LOCALES);
    var currentDate = new Date();
    if (date === "вчора")
        currentDate.setDate(currentDate.getDate() - 1);
    if (date === "позавчора")
        currentDate.setDate(currentDate.getDate() - 2);
    var currentLocaleDate = currentDate.toLocaleDateString(constants_1.LOCALES);
    var _a = currentLocaleDate.split("."), currentDay = _a[0], currentMonth = _a[1], currentYear = _a[2];
    var _b = date.split("."), userDay = _b[0], userMonth = _b[1], userYear = _b[2];
    userYear = (userYear === null || userYear === void 0 ? void 0 : userYear.length) === 2 ? "20" + userYear : userYear;
    var day = (0, startWithZero_1.startWithZero)(/\d/.test(userDay) ? userDay : currentDay);
    var month = (0, startWithZero_1.startWithZero)(userMonth || currentMonth);
    var year = (0, startWithZero_1.startWithZero)(userYear || currentYear);
    var result = day + "." + month + "." + year;
    if (Date.parse(result) > Date.parse(currentLocaleDate)) {
        throw new Error(constants_1.ERROR_MSG_FUTURE_DATE);
    }
    return result;
}
exports.parseDate = parseDate;
