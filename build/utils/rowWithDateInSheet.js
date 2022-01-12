"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rowWithDateInSheet = void 0;
function rowWithDateInSheet(rows, date) {
    return rows.find(row => row.date?.includes(date) && !row.comment?.includes("аванс"));
}
exports.rowWithDateInSheet = rowWithDateInSheet;
