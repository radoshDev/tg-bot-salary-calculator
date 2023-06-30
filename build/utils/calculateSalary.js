"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSalary = void 0;
const constants_1 = require("../constants");
function calculateSalary(rows, type) {
    // eslint-disable-next-line unicorn/no-array-reduce
    return rows.reduce((sum, row) => {
        let dayIncome;
        if (type === "total") {
            dayIncome = row.comment?.includes(constants_1.ADVANCE_TEXT) ? 0 : row.day_income;
        }
        if (type === "advance") {
            dayIncome = row.comment?.includes(constants_1.ADVANCE_TEXT) ? row.day_income : 0;
        }
        return sum + Number(dayIncome);
    }, 0);
}
exports.calculateSalary = calculateSalary;
