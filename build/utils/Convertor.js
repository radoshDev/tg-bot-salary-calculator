"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convertor = void 0;
class Convertor {
    static base = {
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
        "12": "Грудень",
    };
    static codeToMonth(code) {
        return this.base[code] || "Помилка дати";
    }
    static monthToCode(month) {
        const monthsCodes = Object.keys(this.base);
        return monthsCodes.find(code => this.base[code] === month) || "Помилка дати";
    }
}
exports.Convertor = Convertor;
