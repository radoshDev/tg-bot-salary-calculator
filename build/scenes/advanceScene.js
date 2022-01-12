"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.advanceScene = void 0;
var telegraf_1 = require("telegraf");
var mainMenuButtons_1 = require("../buttons/mainMenuButtons");
var constants_1 = require("../constants");
var parseDate_1 = require("../utils/parseDate");
var advanceConfirmButton_1 = require("../buttons/advanceConfirmButton");
var generateDateAdvanceText_1 = require("../utils/generateDateAdvanceText");
var _a = telegraf_1.Scenes.Stage, enter = _a.enter, leave = _a.leave;
exports.advanceScene = new telegraf_1.Scenes.BaseScene(constants_1.ADVANCE_SCENE_ID);
exports.advanceScene.enter(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, ctx.reply("Введи суму авансу", telegraf_1.Markup.keyboard([constants_1.EXIT_BTN_TEXT]).resize())];
    });
}); });
exports.advanceScene.leave(function (ctx) { return ctx.reply("Головне меню", (0, mainMenuButtons_1.mainMenuButtons)()); });
exports.advanceScene.hears(constants_1.REVENUE_REG_EXP, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, userDate, advance, userComment, date, comment, monthYear, sheet, rows, isDBIncludeComment, currentMonthAdvance;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                if (!ctx.match.groups)
                    throw new Error("Groups does not exist in regular expression");
                _a = ctx.match.groups, userDate = _a.date, advance = _a.revenue, userComment = _a.comment;
                date = (0, parseDate_1.parseDate)(userDate);
                comment = "" + constants_1.ADVANCE_TEXT + (userComment ? " | " + userComment : "");
                monthYear = date.slice(3);
                sheet = ctx.session.sheet;
                return [4 /*yield*/, sheet.getRows()];
            case 1:
                rows = _b.sent();
                isDBIncludeComment = function (row) { var _a, _b; return !!((_a = row.date) === null || _a === void 0 ? void 0 : _a.includes(monthYear)) && !!((_b = row.comment) === null || _b === void 0 ? void 0 : _b.includes(constants_1.ADVANCE_TEXT)); };
                currentMonthAdvance = rows.filter(function (row) { return isDBIncludeComment(row); });
                if (currentMonthAdvance.length > 0) {
                    ctx.session.advance = {
                        date: date,
                        revenue: "",
                        day_income: advance,
                        comment: comment
                    };
                    return [2 /*return*/, ctx.replyWithHTML("\u0412 \u0434\u0430\u043D\u043E\u043C\u0443 \u043C\u0456\u0441\u044F\u0446\u0456 \u0432\u0436\u0435 \u0434\u043E\u0434\u0430\u043D\u043E \u0430\u0432\u0430\u043D\u0441\n" + (0, generateDateAdvanceText_1.generateDateAdvanceText)(currentMonthAdvance) + ".\n \u0414\u043E\u0434\u0430\u0442\u0438 \u0449\u0435 \u043E\u0434\u0438\u043D?", (0, advanceConfirmButton_1.advanceConfirmButton)())];
                }
                return [4 /*yield*/, sheet.addRow({
                        date: date,
                        revenue: "",
                        day_income: advance,
                        comment: comment
                    })];
            case 2:
                _b.sent();
                return [4 /*yield*/, ctx.replyWithHTML("\u0410\u0432\u0430\u043D\u0441 \u043D\u0430 <i>" + date + "</i> \u0432 \u0441\u0443\u043C\u0456 " + advance + " \u0433\u0440\u043D \u0434\u043E\u0434\u0430\u043D\u043E.")];
            case 3:
                _b.sent();
                return [2 /*return*/, ctx.scene.leave()];
        }
    });
}); });
exports.advanceScene.hears(constants_1.EXIT_BTN_TEXT, leave());
exports.advanceScene.action(constants_1.ADVANCE_ADD_ID, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var sheet, _a, date, revenue, advance, comment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                sheet = ctx.session.sheet;
                _a = ctx.session.advance, date = _a.date, revenue = _a.revenue, advance = _a.day_income, comment = _a.comment;
                return [4 /*yield*/, sheet.addRow({
                        date: date,
                        revenue: revenue,
                        day_income: advance,
                        comment: comment
                    })];
            case 1:
                _b.sent();
                return [4 /*yield*/, ctx.answerCbQuery()];
            case 2:
                _b.sent();
                return [4 /*yield*/, ctx.replyWithHTML("\u0410\u0432\u0430\u043D\u0441 \u043D\u0430 <i>" + date + "</i> \u0432 \u0441\u0443\u043C\u0456 " + advance + " \u0433\u0440\u043D \u0434\u043E\u0434\u0430\u043D\u043E.")];
            case 3:
                _b.sent();
                return [2 /*return*/, ctx.scene.leave()];
        }
    });
}); });
exports.advanceScene.action(constants_1.ADVANCE_CANCEL_ID, function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.answerCbQuery()];
            case 1:
                _a.sent();
                return [2 /*return*/, leave()(ctx)];
        }
    });
}); });
exports.advanceScene.on("message", function (ctx) { return ctx.replyWithMarkdown("Потрібно ввести суму цифрам від 100 до 99999 грн"); });
