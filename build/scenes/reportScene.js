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
exports.reportScene = void 0;
var telegraf_1 = require("telegraf");
var monthsButtons_1 = require("../buttons/monthsButtons");
var mainMenuButtons_1 = require("../buttons/mainMenuButtons");
var constants_1 = require("../constants");
var compareMonth_1 = require("../utils/compareMonth");
var Convertor_1 = require("../utils/Convertor");
var generateReportText_1 = require("../utils/generateReportText");
var _a = telegraf_1.Scenes.Stage, enter = _a.enter, leave = _a.leave;
exports.reportScene = new telegraf_1.Scenes.BaseScene(constants_1.REPORT_SCENE_ID);
exports.reportScene.enter(function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var rows;
    return __generator(this, function (_a) {
        rows = ctx.session.rows;
        return [2 /*return*/, ctx.reply("Вибери місяць:", (0, monthsButtons_1.monthsButtons)(rows))];
    });
}); });
exports.reportScene.leave(function (ctx) { return ctx.reply("Головне меню", (0, mainMenuButtons_1.mainMenuButtons)()); });
exports.reportScene.hears(constants_1.MONTH_REG_EXP, function (ctx) {
    var _a = ctx.match, _ = _a[0], month = _a[1], year = _a[2];
    var numerableDateMonthYear = Convertor_1.Convertor.monthToCode(month) + "." + year;
    var rowsOfMonth = ctx.session.rows
        .map(function (_a) {
        var date = _a.date, revenue = _a.revenue, day_income = _a.day_income, comment = _a.comment;
        return ({ date: date, revenue: revenue, day_income: day_income, comment: comment });
    })
        .filter(function (row) { var _a; return (_a = row.date) === null || _a === void 0 ? void 0 : _a.includes(numerableDateMonthYear); })
        .sort(function (a, b) { return (0, compareMonth_1.compareMonth)(a.date, b.date, "asc"); });
    return ctx.replyWithHTML((0, generateReportText_1.generateReportText)(rowsOfMonth));
});
exports.reportScene.hears(constants_1.EXIT_BTN_TEXT, leave());
exports.reportScene.on("message", function (ctx) { return ctx.replyWithMarkdown("Треба вибрати з кнопок"); });
