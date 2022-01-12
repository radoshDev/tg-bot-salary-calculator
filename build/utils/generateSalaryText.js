"use strict";
exports.__esModule = true;
exports.generateSalaryText = void 0;
var calculateSalary_1 = require("./calculateSalary");
var generateSalaryText = function (rows, monthYear) {
    if (monthYear === void 0) { monthYear = "місяць"; }
    var summary = "\n\n<b>\u0417\u0430 <i>" + monthYear + "</i>:</b>";
    var totalSalarySum = (0, calculateSalary_1.calculateSalary)(rows, "total");
    var advanceSum = (0, calculateSalary_1.calculateSalary)(rows, "advance");
    var totalSalary = "\n\uD83E\uDD11 <i>\u0437\u0430\u0440\u043E\u0431\u043B\u0435\u043D\u043E</i>: <b>" + totalSalarySum + "</b> \u0433\u0440\u043D";
    var advance = "\n\uD83D\uDCB8 <i>\u043E\u0442\u0440\u0438\u043C\u0430\u043D\u043E \u0430\u0432\u0430\u043D\u0441</i>: <b>" + advanceSum + "</b> \u0433\u0440\u043D";
    var restSalary = "\n\uD83D\uDCB5 <i>\u0434\u043E \u0441\u043F\u043B\u0430\u0442\u0438</i>: <b>" + (totalSalarySum - advanceSum) + "</b> \u0433\u0440\u043D";
    return summary + totalSalary + advance + restSalary;
};
exports.generateSalaryText = generateSalaryText;
