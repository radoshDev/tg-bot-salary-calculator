"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthsButtons = void 0;
const telegraf_1 = require("telegraf");
const constants_1 = require("../constants");
const generateMonthButtonText_1 = require("../utils/generateMonthButtonText");
function monthsButtons(rows, maxMonth) {
    const buttonsList = (0, generateMonthButtonText_1.generateMonthButtonText)(rows);
    if (maxMonth && buttonsList.length > maxMonth) {
        const firstFewMonths = buttonsList.slice(0, maxMonth);
        return telegraf_1.Markup.keyboard([constants_1.EXIT_BTN_TEXT, ...firstFewMonths, constants_1.MORE_BTN_TEXT], {
            columns: 3,
        }).resize();
    }
    return telegraf_1.Markup.keyboard([constants_1.EXIT_BTN_TEXT, ...buttonsList], {
        columns: 3,
    }).resize();
}
exports.monthsButtons = monthsButtons;
