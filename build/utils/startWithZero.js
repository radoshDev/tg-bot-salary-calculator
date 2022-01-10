"use strict";
exports.__esModule = true;
exports.startWithZero = void 0;
function startWithZero(value) {
    if (typeof value === "string")
        value = Number(value);
    if (isNaN(value) || value < 1)
        throw new Error("Not valid number: " + value);
    return value > 9 ? "" + value : "0" + value;
}
exports.startWithZero = startWithZero;
