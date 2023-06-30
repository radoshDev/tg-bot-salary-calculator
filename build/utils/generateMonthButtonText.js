"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMonthButtonText = void 0;
const compareMonth_1 = require("./compareMonth");
const Convertor_1 = require("./Convertor");
function generateMonthButtonText(rows) {
    const uniqMonthYearWithDon = rows
        .map(row => row.date?.slice(3) || "")
        .filter((item, pos, self) => self.indexOf(item) === pos)
        .sort((a, b) => (0, compareMonth_1.compareMonth)(`01.${a}`, `01.${b}`, "desc"));
    const buttonsList = uniqMonthYearWithDon.map(item => {
        const [month, year] = item.split(".");
        return `${Convertor_1.Convertor.codeToMonth(month)} ${year}`;
    });
    return buttonsList;
}
exports.generateMonthButtonText = generateMonthButtonText;
