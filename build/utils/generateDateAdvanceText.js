"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateDateAdvanceText = void 0;
const generateDateAdvanceText = (rows) => {
    return rows.map(row => `<i>${row.date}</i> - <b>${row.day_income} грн</b>`).join("\n");
};
exports.generateDateAdvanceText = generateDateAdvanceText;
