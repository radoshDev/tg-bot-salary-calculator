"use strict";
exports.__esModule = true;
exports.generateDateAdvanceText = void 0;
var generateDateAdvanceText = function (rows) {
    return rows.map(function (row) { return "<i>" + row.date + "</i> - <b>" + row.day_income + " \u0433\u0440\u043D</b>"; }).join("\n");
};
exports.generateDateAdvanceText = generateDateAdvanceText;
