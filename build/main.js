"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const telegraf_1 = require("telegraf");
const google_spreadsheet_1 = require("google-spreadsheet");
const dotenv_1 = require("dotenv");
const scenes_1 = require("./scenes");
const mainMenuButtons_1 = require("./buttons/mainMenuButtons");
const compliment_1 = require("./utils/compliment");
const rowWithDateInSheet_1 = require("./utils/rowWithDateInSheet");
const parseUserText_1 = require("./utils/parseUserText");
const constants_1 = require("./constants");
const loaderButton_1 = require("./buttons/loaderButton");
const calculateDayIncome_1 = require("./utils/calculateDayIncome");
const parseDate_1 = require("./utils/parseDate");
(0, dotenv_1.config)();
const token = process.env.TG_BOT_TOKEN;
if (!token)
    throw new Error("BOT_TOKEN must be provided!");
const bot = new telegraf_1.Telegraf(token);
start();
async function start() {
    const doc = await initSpreadSheet();
    bot.use((0, telegraf_1.session)());
    bot.use(scenes_1.stage.middleware());
    bot.start(async (ctx) => {
        const title = getSheetTitle(ctx);
        const sheet = doc.sheetsByTitle[title];
        if (!sheet) {
            await generateSheet(doc, title);
        }
        return ctx.reply("Вітаю в Калькуляторі зарплати", (0, mainMenuButtons_1.mainMenuButtons)());
    });
    bot.hears(constants_1.SALARY_BTN_TEXT, async (ctx) => {
        try {
            ctx.reply(constants_1.LOAD_BTN_TEXT, (0, loaderButton_1.loaderButton)());
            const user = ctx.message.from.username || ctx.message.from.first_name + ctx.message.from.id;
            const sheet = doc.sheetsByTitle[user || "default"];
            if (!sheet)
                throw new Error(constants_1.ERROR_MSG_SHEET);
            ctx.session.rows = await sheet.getRows();
            return ctx.scene.enter(constants_1.SALARY_SCENE_ID);
        }
        catch (error_) {
            const error = error_;
            return ctx.replyWithHTML(error.message);
        }
    });
    bot.hears(constants_1.REPORT_BTN_TEXT, async (ctx) => {
        try {
            ctx.reply(constants_1.LOAD_BTN_TEXT, (0, loaderButton_1.loaderButton)());
            const title = getSheetTitle(ctx);
            const sheet = doc.sheetsByTitle[title];
            if (!sheet)
                throw new Error(constants_1.ERROR_MSG_SHEET);
            ctx.session.rows = await sheet.getRows();
            return ctx.scene.enter(constants_1.REPORT_SCENE_ID);
        }
        catch (error_) {
            const error = error_;
            return ctx.replyWithHTML(error.message);
        }
    });
    bot.hears(constants_1.ADVANCE_BTN_TEXT, async (ctx) => {
        try {
            const title = getSheetTitle(ctx);
            const sheet = doc.sheetsByTitle[title];
            if (!sheet)
                throw new Error(constants_1.ERROR_MSG_SHEET);
            ctx.session.sheet = sheet;
            return ctx.scene.enter(constants_1.ADVANCE_SCENE_ID);
        }
        catch (error_) {
            const error = error_;
            return ctx.replyWithHTML(error.message);
        }
    });
    bot.hears(constants_1.REVENUE_REG_EXP, async (ctx) => {
        try {
            const userInput = ctx.message.text;
            const { date, comment, revenue, day_income } = (0, parseUserText_1.parseUserText)(userInput);
            const title = getSheetTitle(ctx);
            const sheet = doc.sheetsByTitle[title];
            if (!sheet)
                throw new Error(constants_1.ERROR_MSG_SHEET);
            const rows = await sheet.getRows();
            const rowInDB = (0, rowWithDateInSheet_1.rowWithDateInSheet)(rows, date);
            if (rowInDB && !rowInDB.comment?.includes(constants_1.ADVANCE_TEXT)) {
                rowInDB.revenue = revenue;
                rowInDB.day_income = day_income;
                rowInDB.comment = comment;
                await rowInDB.save();
                return ctx.replyWithHTML(`Відредаговано за <i>${date}</i>.\n\n Заробіток у цей день: <b>${(0, calculateDayIncome_1.calculateDayIncome)(revenue)} грн</b>`);
            }
            const rowValue = {
                date,
                revenue,
                day_income,
                comment,
            };
            await sheet.addRow(rowValue);
            return ctx.replyWithHTML(`Твій заробіток за <i>${date === (0, parseDate_1.parseDate)("") ? "сьогодні" : date}</i> - <b>${day_income} грн.</b>${(0, compliment_1.compliment)(Number(day_income))}`);
        }
        catch (error_) {
            const error = error_;
            return ctx.replyWithHTML(error.message);
        }
    });
    bot.help(ctx => ctx.reply("Send me a sticker"));
    bot.command("db", async (ctx) => ctx.replyWithHTML("<a href='https://docs.google.com/spreadsheets/d/1MkRAS_yyHMFRvZiKKbmyAAe1Nzc6wFopAJ9WciCvMpQ/edit#gid=0'>База даних</a>"));
    bot.on("message", ctx => {
        return ctx.replyWithHTML("<u>Не вірно введена виручка</u>\n<i>Приклад:</i>\n<b>23000</b>\n---або---\n<b>вчора 25700</b>\n---або---\n<b>21.01 35800</b>");
    });
    bot.launch();
}
async function initSpreadSheet() {
    const doc = new google_spreadsheet_1.GoogleSpreadsheet(process.env.SPREADSHEET_ID);
    const clientEmail = process.env.SPREADSHEET_EMAIL;
    const privateKey = process.env.SPREADSHEET_PRIVATE_KEY?.replace(/\\n/g, "\n");
    if (!clientEmail)
        throw new Error("SPREADSHEET_EMAIL must be provided!");
    if (!privateKey)
        throw new Error("SPREADSHEET_PRIVATE_KEY must be provided!");
    await doc.useServiceAccountAuth({
        client_email: clientEmail,
        private_key: privateKey,
    });
    await doc.loadInfo();
    return doc;
}
async function generateSheet(doc, title) {
    const newSheet = await doc.addSheet({ headerValues: Object.values(constants_1.Headers), title });
    return newSheet;
}
function getSheetTitle(ctx) {
    const userName = ctx.message?.from?.username;
    const firstName = ctx.message?.from?.first_name || "Unknown";
    const userId = ctx.message?.from.id || new Date();
    const title = userName || firstName + userId;
    return title;
}
// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
