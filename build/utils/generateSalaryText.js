"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSalaryText = void 0;
const calculateSalary_1 = require("./calculateSalary");
const generateSalaryText = (rows, monthYear = "місяць") => {
    const summary = `\n\n<b>За <i>${monthYear}</i>:</b>`;
    const totalSalarySum = (0, calculateSalary_1.calculateSalary)(rows, "total");
    const advanceSum = (0, calculateSalary_1.calculateSalary)(rows, "advance");
    const totalSalary = `\n🤑 <i>зароблено</i>: <b>${totalSalarySum}</b> грн`;
    const advance = `\n💸 <i>отримано аванс</i>: <b>${advanceSum}</b> грн`;
    const restSalary = `\n💵 <i>до сплати</i>: <b>${totalSalarySum - advanceSum}</b> грн`;
    return summary + totalSalary + advance + restSalary;
};
exports.generateSalaryText = generateSalaryText;
