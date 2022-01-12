"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportScene = void 0;
const telegraf_1 = require("telegraf");
const monthsButtons_1 = require("../buttons/monthsButtons");
const mainMenuButtons_1 = require("../buttons/mainMenuButtons");
const constants_1 = require("../constants");
const compareMonth_1 = require("../utils/compareMonth");
const Convertor_1 = require("../utils/Convertor");
const generateReportText_1 = require("../utils/generateReportText");
const generateSalaryText_1 = require("../utils/generateSalaryText");
const { leave } = telegraf_1.Scenes.Stage;
exports.reportScene = new telegraf_1.Scenes.BaseScene(constants_1.REPORT_SCENE_ID);
exports.reportScene.enter(async (ctx) => {
    const { rows } = ctx.session;
    return ctx.reply("Вибери місяць:", (0, monthsButtons_1.monthsButtons)(rows));
});
exports.reportScene.leave(ctx => ctx.reply("Головне меню", (0, mainMenuButtons_1.mainMenuButtons)()));
exports.reportScene.hears(constants_1.MONTH_REG_EXP, ctx => {
    const [_, month, year] = ctx.match;
    const numerableDateMonthYear = `${Convertor_1.Convertor.monthToCode(month)}.${year}`;
    const rowsOfMonth = ctx.session.rows
        .filter(row => row.date?.includes(numerableDateMonthYear))
        .sort((a, b) => (0, compareMonth_1.compareMonth)(a.date, b.date, "asc"));
    return ctx.replyWithHTML((0, generateReportText_1.generateReportText)(rowsOfMonth) + (0, generateSalaryText_1.generateSalaryText)(rowsOfMonth, ctx.message.text));
});
exports.reportScene.hears(constants_1.EXIT_BTN_TEXT, leave());
exports.reportScene.on("message", ctx => ctx.replyWithMarkdown("Треба вибрати з кнопок"));
