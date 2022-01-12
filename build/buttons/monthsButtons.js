"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.monthsButtons = void 0;
var telegraf_1 = require("telegraf");
var constants_1 = require("../constants");
var generateMonthButtonText_1 = require("../utils/generateMonthButtonText");
function monthsButtons(rows) {
    var buttonsList = (0, generateMonthButtonText_1.generateMonthButtonText)(rows);
    return telegraf_1.Markup.keyboard(__spreadArray([constants_1.EXIT_BTN_TEXT], buttonsList, true), {
        columns: 3
    }).resize();
}
exports.monthsButtons = monthsButtons;
