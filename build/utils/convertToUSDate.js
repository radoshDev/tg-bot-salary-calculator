"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToUsDate = void 0;
function convertToUsDate(datable) {
    const [day, month, year] = datable.split(".");
    return `${month}.${day}.${year}`;
}
exports.convertToUsDate = convertToUsDate;
