"use strict";
exports.__esModule = true;
exports.calculateDayIncome = void 0;
var constants_1 = require("../constants");
function calculateDayIncome(revenue) {
    return Math.floor(Number(revenue) / 100 + constants_1.FIXED_SALARY);
}
exports.calculateDayIncome = calculateDayIncome;
