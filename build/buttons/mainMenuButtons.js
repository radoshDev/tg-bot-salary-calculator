"use strict";
exports.__esModule = true;
exports.mainMenuButtons = void 0;
var telegraf_1 = require("telegraf");
var constants_1 = require("../constants");
var mainMenuButtons = function () {
    return telegraf_1.Markup.keyboard([constants_1.REPORT_BTN_TEXT, constants_1.SALARY_BTN_TEXT, constants_1.ADVANCE_BTN_TEXT], {
        columns: 3
    }).resize();
};
exports.mainMenuButtons = mainMenuButtons;
