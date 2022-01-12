"use strict";
exports.__esModule = true;
exports.compareMonth = void 0;
var convertToUsDate_1 = require("./convertToUsDate");
function compareMonth(datableA, datableB, rank) {
    if (!datableA || !datableB)
        return 0;
    var aDate = Date.parse((0, convertToUsDate_1.convertToUsDate)(datableA));
    var bDate = Date.parse((0, convertToUsDate_1.convertToUsDate)(datableB));
    if (Number.isNaN(aDate) || Number.isNaN(bDate))
        throw new Error("Pass not datable value");
    if (rank === "asc")
        return aDate - bDate;
    if (rank === "desc")
        return bDate - aDate;
    return 0;
}
exports.compareMonth = compareMonth;
