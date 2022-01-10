"use strict";
exports.__esModule = true;
exports.monthsButtons = void 0;
var telegraf_1 = require("telegraf");
var constants_1 = require("../constants");
var generateMonthBtnText_1 = require("../utils/generateMonthBtnText");
function monthsButtons(rows) {
    var buttonsList = (0, generateMonthBtnText_1.generateMonthBtnText)(rows);
    return telegraf_1.Markup.keyboard([constants_1.EXIT_BTN_TEXT].concat(buttonsList), {
        columns: 3
    }).resize();
}
exports.monthsButtons = monthsButtons;
