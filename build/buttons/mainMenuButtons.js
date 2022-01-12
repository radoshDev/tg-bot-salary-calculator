"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainMenuButtons = void 0;
const telegraf_1 = require("telegraf");
const constants_1 = require("../constants");
const mainMenuButtons = () => telegraf_1.Markup.keyboard([constants_1.REPORT_BTN_TEXT, constants_1.SALARY_BTN_TEXT, constants_1.ADVANCE_BTN_TEXT], {
    columns: 3,
}).resize();
exports.mainMenuButtons = mainMenuButtons;
