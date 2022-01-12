"use strict";
exports.__esModule = true;
exports.convertToUsDate = void 0;
function convertToUsDate(datable) {
    var _a = datable.split("."), day = _a[0], month = _a[1], year = _a[2];
    return month + "." + day + "." + year;
}
exports.convertToUsDate = convertToUsDate;
