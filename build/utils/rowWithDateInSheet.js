"use strict";
exports.__esModule = true;
exports.rowWithDateInSheet = void 0;
function rowWithDateInSheet(rows, date) {
    return rows.find(function (row) { var _a, _b; return ((_a = row['date']) === null || _a === void 0 ? void 0 : _a.includes(date)) && !((_b = row["comment"]) === null || _b === void 0 ? void 0 : _b.includes('аванс')); });
}
exports.rowWithDateInSheet = rowWithDateInSheet;
