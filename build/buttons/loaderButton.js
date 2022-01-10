"use strict";
exports.__esModule = true;
exports.loaderButton = void 0;
var telegraf_1 = require("telegraf");
var constants_1 = require("../constants");
function loaderButton() {
    return telegraf_1.Markup.keyboard([constants_1.LOAD_BTN_TEXT], {
        columns: 3
    }).resize();
}
exports.loaderButton = loaderButton;
