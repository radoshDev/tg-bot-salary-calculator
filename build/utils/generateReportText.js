"use strict";
exports.__esModule = true;
exports.generateReportText = void 0;
function generateReportText(rows) {
    if (rows.length === 0)
        return "Ще поки нічого не додано в цьому місяці";
    var listOfDays = rows.map(function (row) {
        var comment = row.comment ? " <u>(" + row.comment + ")</u>" : "";
        return "<i>" + row.date + "</i> - <b>" + row.day_income + " \u0433\u0440\u043D</b>" + comment;
    });
    return listOfDays.join("\n");
}
exports.generateReportText = generateReportText;
