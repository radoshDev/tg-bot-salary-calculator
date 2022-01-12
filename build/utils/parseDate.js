"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDate = void 0;
const constants_1 = require("../constants");
const startWithZero_1 = require("./startWithZero");
function parseDate(date) {
    if (!date)
        return new Date().toLocaleDateString(constants_1.LOCALES);
    const currentDate = new Date();
    if (date === "вчора")
        currentDate.setDate(currentDate.getDate() - 1);
    if (date === "позавчора")
        currentDate.setDate(currentDate.getDate() - 2);
    const currentLocaleDate = currentDate.toLocaleDateString(constants_1.LOCALES);
    const [currentDay, currentMonth, currentYear] = currentLocaleDate.split(".");
    const [userDay, userMonth, userYear] = date.split(".");
    const fullYear = userYear?.length === 2 ? `20${userYear}` : userYear;
    const day = (0, startWithZero_1.startWithZero)(/\d/.test(userDay) ? userDay : currentDay);
    const month = (0, startWithZero_1.startWithZero)(userMonth || currentMonth);
    const year = (0, startWithZero_1.startWithZero)(fullYear || currentYear);
    const result = `${day}.${month}.${year}`;
    if (Date.parse(result) > Date.parse(currentLocaleDate)) {
        throw new Error(constants_1.ERROR_MSG_FUTURE_DATE);
    }
    return result;
}
exports.parseDate = parseDate;
