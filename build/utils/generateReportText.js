"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReportText = void 0;
function generateReportText(rows) {
    if (rows.length === 0)
        return "Ще поки нічого не додано в цьому місяці";
    const listOfDays = rows.map(row => {
        const comment = row.comment ? ` <u>(${row.comment})</u>` : "";
        return `<i>${row.date}</i> - <b>${row.day_income} грн</b>${comment}`;
    });
    return listOfDays.join("\n");
}
exports.generateReportText = generateReportText;
