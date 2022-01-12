"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUserText = void 0;
const constants_1 = require("../constants");
const calculateDayIncome_1 = require("./calculateDayIncome");
const parseDate_1 = require("./parseDate");
function parseUserText(inputText) {
    const groupeResult = inputText.match(constants_1.REVENUE_REG_EXP);
    const date = groupeResult?.groups?.date || "";
    const revenue = groupeResult?.groups?.revenue || "";
    const comment = groupeResult?.groups?.comment || "";
    const dayIncome = (0, calculateDayIncome_1.calculateDayIncome)(revenue);
    return {
        date: (0, parseDate_1.parseDate)(date),
        revenue,
        comment,
        day_income: dayIncome.toString(),
    };
}
exports.parseUserText = parseUserText;
