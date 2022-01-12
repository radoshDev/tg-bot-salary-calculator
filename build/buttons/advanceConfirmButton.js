"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advanceConfirmButton = void 0;
const telegraf_1 = require("telegraf");
const constants_1 = require("../constants");
const advanceConfirmButton = () => telegraf_1.Markup.inlineKeyboard([
    telegraf_1.Markup.button.callback("Додати ще", constants_1.ADVANCE_ADD_ID),
    telegraf_1.Markup.button.callback("Скасувати", constants_1.ADVANCE_CANCEL_ID),
]);
exports.advanceConfirmButton = advanceConfirmButton;
