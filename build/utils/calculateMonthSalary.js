"use strict";
exports.__esModule = true;
exports.calculateMonthSalary = void 0;
function calculateMonthSalary(rows) {
    return rows.reduce(function (sum, row) { return sum + Number(row.day_income); }, 0);
}
exports.calculateMonthSalary = calculateMonthSalary;
