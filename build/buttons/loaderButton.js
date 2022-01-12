"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loaderButton = void 0;
const telegraf_1 = require("telegraf");
const constants_1 = require("../constants");
function loaderButton() {
    return telegraf_1.Markup.keyboard([constants_1.LOAD_BTN_TEXT], {
        columns: 3,
    }).resize();
}
exports.loaderButton = loaderButton;
