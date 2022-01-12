"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.monthsButtons = void 0;
const telegraf_1 = require("telegraf");
const constants_1 = require("../constants");
const generateMonthButtonText_1 = require("../utils/generateMonthButtonText");
function monthsButtons(rows) {
    const buttonsList = (0, generateMonthButtonText_1.generateMonthButtonText)(rows);
    return telegraf_1.Markup.keyboard([constants_1.EXIT_BTN_TEXT, ...buttonsList], {
        columns: 3,
    }).resize();
}
exports.monthsButtons = monthsButtons;
