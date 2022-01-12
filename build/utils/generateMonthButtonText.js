"use strict";
exports.__esModule = true;
exports.generateMonthButtonText = void 0;
var compareMonth_1 = require("./compareMonth");
var Convertor_1 = require("./Convertor");
function generateMonthButtonText(rows) {
    var uniqMonthYearWithDon = rows
        .map(function (row) { var _a; return ((_a = row.date) === null || _a === void 0 ? void 0 : _a.slice(3)) || ""; })
        .filter(function (item, pos, self) { return self.indexOf(item) === pos; })
        .sort(function (a, b) { return (0, compareMonth_1.compareMonth)("01." + a, "01." + b, "desc"); });
    var buttonsList = uniqMonthYearWithDon.map(function (item) {
        var _a = item.split("."), month = _a[0], year = _a[1];
        return Convertor_1.Convertor.codeToMonth(month) + " " + year;
    });
    return buttonsList;
}
exports.generateMonthButtonText = generateMonthButtonText;
