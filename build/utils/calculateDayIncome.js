"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDayIncome = void 0;
const constants_1 = require("../constants");
function calculateDayIncome(revenue) {
    return Math.floor(Number(revenue) / 100 + constants_1.FIXED_SALARY);
}
exports.calculateDayIncome = calculateDayIncome;
