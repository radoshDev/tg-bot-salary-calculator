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
var telegraf_1 = require("telegraf");
var google_spreadsheet_1 = require("google-spreadsheet");
var scenes_1 = require("./scenes");
var mainMenuButtons_1 = require("./buttons/mainMenuButtons");
var compliment_1 = require("./utils/compliment");
var rowWithDateInSheet_1 = require("./utils/rowWithDateInSheet");
var parseUserText_1 = require("./utils/parseUserText");
var constants_1 = require("./constants");
var loaderButton_1 = require("./buttons/loaderButton");
var calculateDayIncome_1 = require("./utils/calculateDayIncome");
//reading ENV file
require("dotenv").config();
var token = process.env.TG_BOT_TOKEN;
if (!token)
    throw Error("BOT_TOKEN must be provided!");
var bot = new telegraf_1.Telegraf(token);
start();
function start() {
    return __awaiter(this, void 0, void 0, function () {
        var doc_1, error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, initSpreadSheet()];
                case 1:
                    doc_1 = _a.sent();
                    bot.use((0, telegraf_1.session)());
                    bot.use(scenes_1.stage.middleware());
                    bot.start(function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        var title, sheet;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    title = getSheetTitle(ctx);
                                    sheet = doc_1.sheetsByTitle[title];
                                    if (!!sheet) return [3 /*break*/, 2];
                                    return [4 /*yield*/, generateSheet(doc_1, title)];
                                case 1:
                                    _a.sent();
                                    _a.label = 2;
                                case 2: return [2 /*return*/, ctx.reply("Вітаю в Калькуляторі зарплати", (0, mainMenuButtons_1.mainMenuButtons)())];
                            }
                        });
                    }); });
                    bot.hears(constants_1.SALARY_BTN_TEXT, function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        var user, sheet, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    ctx.reply(constants_1.LOAD_BTN_TEXT, (0, loaderButton_1.loaderButton)());
                                    user = ctx.message.from.username || ctx.message.from.first_name + ctx.message.from.id;
                                    sheet = doc_1.sheetsByTitle[user || "default"];
                                    if (!sheet)
                                        return [2 /*return*/, console.log("Error from Зарплата")];
                                    _a = ctx.session;
                                    return [4 /*yield*/, sheet.getRows()];
                                case 1:
                                    _a.rows = _b.sent();
                                    return [4 /*yield*/, ctx.scene.enter(constants_1.SALARY_SCENE_ID)];
                                case 2: return [2 /*return*/, _b.sent()];
                            }
                        });
                    }); });
                    bot.hears(constants_1.REPORT_BTN_TEXT, function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        var title, sheet, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    ctx.reply(constants_1.LOAD_BTN_TEXT, (0, loaderButton_1.loaderButton)());
                                    title = getSheetTitle(ctx);
                                    sheet = doc_1.sheetsByTitle[title];
                                    if (!sheet)
                                        throw Error(constants_1.ERROR_MSG_SHEET);
                                    _a = ctx.session;
                                    return [4 /*yield*/, sheet.getRows()];
                                case 1:
                                    _a.rows = _b.sent();
                                    return [4 /*yield*/, ctx.scene.enter(constants_1.REPORT_SCENE_ID)];
                                case 2: return [2 /*return*/, _b.sent()];
                            }
                        });
                    }); });
                    bot.hears(constants_1.ADVANCE_BTN_TEXT, function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        var title, sheet;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    title = getSheetTitle(ctx);
                                    sheet = doc_1.sheetsByTitle[title];
                                    if (!sheet)
                                        throw Error(constants_1.ERROR_MSG_SHEET);
                                    ctx.session.sheet = sheet;
                                    return [4 /*yield*/, ctx.scene.enter(constants_1.ADVANCE_SCENE_ID)];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        });
                    }); });
                    bot.hears(constants_1.REVENUE_REG_EXP, function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        var userInput, _a, date, comment, revenue, day_income, title, sheet, rows, rowInDB, e_1, error;
                        var _b;
                        return __generator(this, function (_c) {
                            switch (_c.label) {
                                case 0:
                                    _c.trys.push([0, 5, , 6]);
                                    userInput = ctx.message.text;
                                    _a = (0, parseUserText_1.parseUserText)(userInput), date = _a.date, comment = _a.comment, revenue = _a.revenue, day_income = _a.day_income;
                                    title = getSheetTitle(ctx);
                                    sheet = doc_1.sheetsByTitle[title];
                                    if (!sheet)
                                        throw Error(constants_1.ERROR_MSG_SHEET);
                                    return [4 /*yield*/, sheet.getRows()];
                                case 1:
                                    rows = _c.sent();
                                    rowInDB = (0, rowWithDateInSheet_1.rowWithDateInSheet)(rows, date);
                                    if (!(rowInDB && !((_b = rowInDB.comment) === null || _b === void 0 ? void 0 : _b.includes(constants_1.ADVANCE_TEXT)))) return [3 /*break*/, 3];
                                    rowInDB.revenue = revenue;
                                    rowInDB.day_income = day_income;
                                    rowInDB.comment = comment;
                                    return [4 /*yield*/, rowInDB.save()];
                                case 2:
                                    _c.sent();
                                    return [2 /*return*/, ctx.replyWithHTML("\u0412\u0456\u0434\u0440\u0435\u0434\u0430\u0433\u043E\u0432\u0430\u043D\u043E \u0437\u0430 <i>" + date + "</i>.\n\n \u0417\u0430\u0440\u043E\u0431\u0456\u0442\u043E\u043A \u0443 \u0446\u0435\u0439 \u0434\u0435\u043D\u044C: <b>" + (0, calculateDayIncome_1.calculateDayIncome)(revenue) + " \u0433\u0440\u043D</b>")];
                                case 3: return [4 /*yield*/, sheet.addRow({
                                        date: date,
                                        revenue: revenue,
                                        day_income: day_income,
                                        comment: comment
                                    })];
                                case 4:
                                    _c.sent();
                                    return [2 /*return*/, ctx.replyWithMarkdown((0, compliment_1.compliment)(Number(day_income)))];
                                case 5:
                                    e_1 = _c.sent();
                                    error = e_1;
                                    return [2 /*return*/, ctx.replyWithHTML(error.message)];
                                case 6: return [2 /*return*/];
                            }
                        });
                    }); });
                    bot.help(function (ctx) { return ctx.reply("Send me a sticker"); });
                    bot.command("db", function (ctx) { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            return [2 /*return*/, ctx.replyWithHTML("<a href='https://docs.google.com/spreadsheets/d/1MkRAS_yyHMFRvZiKKbmyAAe1Nzc6wFopAJ9WciCvMpQ/edit#gid=0'>База даних</a>")];
                        });
                    }); });
                    bot.on("message", function (ctx) {
                        console.log(ctx.from);
                        return ctx.replyWithHTML("<u>Не вірно введена виручка</u>\n<i>Приклад:</i>\n<b>23000</b>\n---або---\n<b>вчора 25700</b>\n---або---\n<b>21.01 35800</b>");
                    });
                    bot.launch();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function initSpreadSheet() {
    return __awaiter(this, void 0, void 0, function () {
        var doc;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    doc = new google_spreadsheet_1.GoogleSpreadsheet(process.env.SPREADSHEET_ID);
                    return [4 /*yield*/, doc.useServiceAccountAuth({
                            client_email: process.env.SPREADSHEET_EMAIL,
                            private_key: process.env.SPREADSHEET_PRIVATE_KEY.replace(/\\n/g, "\n")
                        })];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, doc.loadInfo()];
                case 2:
                    _a.sent();
                    return [2 /*return*/, doc];
            }
        });
    });
}
function generateSheet(doc, title) {
    return __awaiter(this, void 0, void 0, function () {
        var newSheet;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, doc.addSheet({ headerValues: Object.values(constants_1.Headers), title: title })];
                case 1:
                    newSheet = _a.sent();
                    return [2 /*return*/, newSheet];
            }
        });
    });
}
function getSheetTitle(ctx) {
    var _a, _b, _c, _d, _e;
    var userName = (_b = (_a = ctx.message) === null || _a === void 0 ? void 0 : _a.from) === null || _b === void 0 ? void 0 : _b.username;
    var firstName = ((_d = (_c = ctx.message) === null || _c === void 0 ? void 0 : _c.from) === null || _d === void 0 ? void 0 : _d.first_name) || "Unknown";
    var userId = ((_e = ctx.message) === null || _e === void 0 ? void 0 : _e.from.id) || new Date();
    var title = userName || firstName + userId;
    return title;
}
// Enable graceful stop
process.once("SIGINT", function () { return bot.stop("SIGINT"); });
process.once("SIGTERM", function () { return bot.stop("SIGTERM"); });
