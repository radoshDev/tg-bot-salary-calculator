"use strict";
exports.__esModule = true;
exports.parseUserText = void 0;
var constants_1 = require("../constants");
var calculateDayIncome_1 = require("./calculateDayIncome");
var parseDate_1 = require("./parseDate");
function parseUserText(inputText) {
    var _a, _b, _c;
    var groupeResult = inputText.match(constants_1.REVENUE_REG_EXP);
    var date = ((_a = groupeResult === null || groupeResult === void 0 ? void 0 : groupeResult.groups) === null || _a === void 0 ? void 0 : _a.date) || "";
    var revenue = ((_b = groupeResult === null || groupeResult === void 0 ? void 0 : groupeResult.groups) === null || _b === void 0 ? void 0 : _b.revenue) || "";
    var comment = ((_c = groupeResult === null || groupeResult === void 0 ? void 0 : groupeResult.groups) === null || _c === void 0 ? void 0 : _c.comment) || "";
    var dayIncome = (0, calculateDayIncome_1.calculateDayIncome)(revenue);
    return {
        date: (0, parseDate_1.parseDate)(date),
        revenue: revenue,
        comment: comment,
        day_income: dayIncome.toString()
    };
}
exports.parseUserText = parseUserText;
