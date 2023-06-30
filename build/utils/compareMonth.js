"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareMonth = void 0;
const convertToUsDate_1 = require("@/utils/convertToUsDate");
function compareMonth(datableA, datableB, rank) {
    if (!datableA || !datableB)
        return 0;
    const aDate = Date.parse((0, convertToUsDate_1.convertToUsDate)(datableA));
    const bDate = Date.parse((0, convertToUsDate_1.convertToUsDate)(datableB));
    if (Number.isNaN(aDate) || Number.isNaN(bDate))
        throw new Error("Pass not datable value");
    if (rank === "asc")
        return aDate - bDate;
    if (rank === "desc")
        return bDate - aDate;
    return 0;
}
exports.compareMonth = compareMonth;
