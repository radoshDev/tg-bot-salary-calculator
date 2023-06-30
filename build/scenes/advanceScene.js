"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.advanceScene = void 0;
const telegraf_1 = require("telegraf");
const mainMenuButtons_1 = require("../buttons/mainMenuButtons");
const constants_1 = require("../constants");
const parseDate_1 = require("../utils/parseDate");
const advanceConfirmButton_1 = require("../buttons/advanceConfirmButton");
const generateDateAdvanceText_1 = require("../utils/generateDateAdvanceText");
const { leave } = telegraf_1.Scenes.Stage;
exports.advanceScene = new telegraf_1.Scenes.BaseScene(constants_1.ADVANCE_SCENE_ID);
exports.advanceScene.enter(async (ctx) => {
    return ctx.reply("Введи суму авансу", telegraf_1.Markup.keyboard([constants_1.EXIT_BTN_TEXT]).resize());
});
exports.advanceScene.leave(ctx => ctx.reply("Головне меню", (0, mainMenuButtons_1.mainMenuButtons)()));
exports.advanceScene.hears(constants_1.REVENUE_REG_EXP, async (ctx) => {
    try {
        if (!ctx.match.groups)
            throw new Error("Щось пішло не так. Спробуй по іншому записати дату");
        const { date: userDate, revenue: advance, comment: userComment } = ctx.match.groups;
        const date = (0, parseDate_1.parseDate)(userDate);
        const comment = `${constants_1.ADVANCE_TEXT}${userComment ? ` | ${userComment}` : ""}`;
        const monthYear = date.slice(3);
        const { sheet } = ctx.session;
        const rows = await sheet.getRows();
        const isDBIncludeComment = (row) => !!row.date?.includes(monthYear) && !!row.comment?.includes(constants_1.ADVANCE_TEXT);
        const currentMonthAdvance = rows.filter(row => isDBIncludeComment(row));
        if (currentMonthAdvance.length > 0) {
            ctx.session.advance = {
                date,
                revenue: "",
                day_income: advance,
                comment,
            };
            return ctx.replyWithHTML(`В даному місяці вже додано аванс\n${(0, generateDateAdvanceText_1.generateDateAdvanceText)(currentMonthAdvance)}.\n Додати ще один?`, (0, advanceConfirmButton_1.advanceConfirmButton)());
        }
        await sheet.addRow({
            date,
            revenue: "",
            day_income: advance,
            comment,
        });
        await ctx.replyWithHTML(`Аванс на <i>${date}</i> в сумі ${advance} грн додано.`);
        return ctx.scene.leave();
    }
    catch (_error) {
        const error = _error;
        return ctx.reply(error.message);
    }
});
exports.advanceScene.hears(constants_1.EXIT_BTN_TEXT, leave());
exports.advanceScene.action(constants_1.ADVANCE_ADD_ID, async (ctx) => {
    const { sheet } = ctx.session;
    const { date, revenue, day_income: advance, comment } = ctx.session.advance;
    await sheet.addRow({
        date,
        revenue,
        day_income: advance,
        comment,
    });
    await ctx.answerCbQuery();
    await ctx.replyWithHTML(`Аванс на <i>${date}</i> в сумі ${advance} грн додано.`);
    return ctx.scene.leave();
});
exports.advanceScene.action(constants_1.ADVANCE_CANCEL_ID, async (ctx) => {
    await ctx.answerCbQuery();
    return leave()(ctx);
});
exports.advanceScene.on("message", ctx => ctx.replyWithMarkdown("Потрібно ввести суму цифрам від 100 до 99999 грн"));
