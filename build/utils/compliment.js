"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compliment = void 0;
function compliment(income) {
    if (income > 600) {
        return `Твій заробіток *${income} грн.*\n\n Ти молодець! Гарно попрацювала😘`;
    }
    return `Твій заробіток *${income} грн.*\n\n Це теж не погано, молодчинка. Приїдеш додому я тобі зроблю чаю з ромашкою`;
}
exports.compliment = compliment;
