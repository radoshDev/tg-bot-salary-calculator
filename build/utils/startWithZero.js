"use strict";
exports.__esModule = true;
exports.startWithZero = void 0;
var constants_1 = require("../constants");
function startWithZero(value) {
    var numerable = Number(value);
    if (Number.isNaN(numerable) || numerable < 1)
        throw new Error(constants_1.UNEXPECTED_MSG);
    return numerable > 9 ? "" + numerable : "0" + numerable;
}
exports.startWithZero = startWithZero;
