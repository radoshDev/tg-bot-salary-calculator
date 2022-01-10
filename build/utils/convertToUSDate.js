"use strict";
exports.__esModule = true;
exports.convertToUSDate = void 0;
function convertToUSDate(datable) {
    var _a = datable.split("."), day = _a[0], month = _a[1], year = _a[2];
    return month + "." + day + "." + year;
}
exports.convertToUSDate = convertToUSDate;
