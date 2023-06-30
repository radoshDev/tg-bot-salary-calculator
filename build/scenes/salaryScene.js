"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.salaryScene = void 0;
const telegraf_1 = require("telegraf");
const monthsButtons_1 = require("../buttons/monthsButtons");
const mainMenuButtons_1 = require("../buttons/mainMenuButtons");
const constants_1 = require("../constants");
const Convertor_1 = require("../utils/Convertor");
const generateSalaryText_1 = require("../utils/generateSalaryText");
const { leave } = telegraf_1.Scenes.Stage;
exports.salaryScene = new telegraf_1.Scenes.BaseScene(constants_1.SALARY_SCENE_ID);
exports.salaryScene.enter(async (ctx) => {
    const { rows } = ctx.session;
    return ctx.reply("Вибери місяць:", (0, monthsButtons_1.monthsButtons)(rows, constants_1.MAX_MONTHS));
});
exports.salaryScene.leave(ctx => ctx.reply("Головне меню", (0, mainMenuButtons_1.mainMenuButtons)()));
exports.salaryScene.hears(constants_1.MONTH_REG_EXP, ctx => {
    const [_, month, year] = ctx.match;
    const numerableDateMonthYear = `${Convertor_1.Convertor.monthToCode(month)}.${year}`;
    const rowsOfMonth = ctx.session.rows.filter(row => row.date?.includes(numerableDateMonthYear));
    return ctx.replyWithHTML((0, generateSalaryText_1.generateSalaryText)(rowsOfMonth, ctx.message.text));
});
exports.salaryScene.hears(constants_1.EXIT_BTN_TEXT, leave());
exports.salaryScene.hears(constants_1.MORE_BTN_TEXT, ctx => {
    const { rows } = ctx.session;
    return ctx.reply("Вибери місяць, це все що маю я:", (0, monthsButtons_1.monthsButtons)(rows));
});
exports.salaryScene.on("message", ctx => ctx.replyWithMarkdown("Треба вибрати з кнопок"));
