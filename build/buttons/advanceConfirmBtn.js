"use strict";
exports.__esModule = true;
exports.advanceConfirmBtn = void 0;
var telegraf_1 = require("telegraf");
var constants_1 = require("../constants");
var advanceConfirmBtn = function () {
    return telegraf_1.Markup.inlineKeyboard([
        telegraf_1.Markup.button.callback("Додати ще", constants_1.ADVANCE_ADD_ID),
        telegraf_1.Markup.button.callback("Скасувати", constants_1.ADVANCE_CANCEL_ID),
    ]);
};
exports.advanceConfirmBtn = advanceConfirmBtn;
