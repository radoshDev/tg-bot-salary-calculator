"use strict";
exports.__esModule = true;
exports.calculateSalary = void 0;
var constants_1 = require("../constants");
function calculateSalary(rows, type) {
    // eslint-disable-next-line unicorn/no-array-reduce
    return rows.reduce(function (sum, row) {
        var _a, _b;
        var dayIncome;
        if (type === "total") {
            dayIncome = ((_a = row.comment) === null || _a === void 0 ? void 0 : _a.includes(constants_1.ADVANCE_TEXT)) ? 0 : row.day_income;
        }
        if (type === "advance") {
            dayIncome = ((_b = row.comment) === null || _b === void 0 ? void 0 : _b.includes(constants_1.ADVANCE_TEXT)) ? row.day_income : 0;
        }
        return sum + Number(dayIncome);
    }, 0);
}
exports.calculateSalary = calculateSalary;
