"use strict";
exports.__esModule = true;
exports.Convertor = void 0;
var Convertor = /** @class */ (function () {
    function Convertor() {
    }
    Convertor.codeToMonth = function (code) {
        return this.base[code] || "Помилка дати";
    };
    Convertor.monthToCode = function (month) {
        var _this = this;
        var monthsCodes = Object.keys(this.base);
        return monthsCodes.find(function (code) { return _this.base[code] === month; });
    };
    Convertor.base = {
        "01": "Січень",
        "02": "Лютий",
        "03": "Березень",
        "04": "Квітень",
        "05": "Травень",
        "06": "Червень",
        "07": "Липень",
        "08": "Серпень",
        "09": "Вересень",
        "10": "Жовтень",
        "11": "Листопад",
        "12": "Грудень"
    };
    return Convertor;
}());
exports.Convertor = Convertor;
