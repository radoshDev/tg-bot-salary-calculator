"use strict";
exports.__esModule = true;
exports.compareMonth = void 0;
var convertToUSDate_1 = require("./convertToUSDate");
function compareMonth(datableA, datableB, rank) {
    var aDate = Date.parse((0, convertToUSDate_1.convertToUSDate)(datableA));
    var bDate = Date.parse((0, convertToUSDate_1.convertToUSDate)(datableB));
    if (isNaN(aDate) || isNaN(bDate))
        throw Error("Pass not datable value");
    if (rank === "asc")
        return aDate - bDate;
    if (rank === "desc")
        return bDate - aDate;
    return 0;
}
exports.compareMonth = compareMonth;
