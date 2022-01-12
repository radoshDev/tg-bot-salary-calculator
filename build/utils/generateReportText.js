"use strict";
exports.__esModule = true;
exports.generateReportText = void 0;
var calculateMonthSalary_1 = require("./calculateMonthSalary");
function generateReportText(rows) {
    if (rows.length === 0)
        return "Ще поки нічого не додано в цьому місяці";
    var listOfDays = rows.map(function (row) {
        var comment = row.comment ? " <u>(" + row.comment + ")</u>" : "";
        return "<i>" + row.date + "</i> - <b>" + row.day_income + " \u0433\u0440\u043D</b>" + comment;
    });
    var summary = "\n\n<b>\u0420\u0430\u0437\u043E\u043C: " + (0, calculateMonthSalary_1.calculateMonthSalary)(rows) + " \u0433\u0440\u043D</b>";
    return listOfDays.join("\n") + summary;
}
exports.generateReportText = generateReportText;
