"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startWithZero = void 0;
const constants_1 = require("../constants");
function startWithZero(value) {
    const numerable = Number(value);
    if (Number.isNaN(numerable) || numerable < 1)
        throw new Error(constants_1.UNEXPECTED_MSG);
    return numerable > 9 ? `${numerable}` : `0${numerable}`;
}
exports.startWithZero = startWithZero;
