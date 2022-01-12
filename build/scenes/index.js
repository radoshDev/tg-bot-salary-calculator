"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stage = void 0;
const telegraf_1 = require("telegraf");
const advanceScene_1 = require("./advanceScene");
const reportScene_1 = require("./reportScene");
const salaryScene_1 = require("./salaryScene");
exports.stage = new telegraf_1.Scenes.Stage([salaryScene_1.salaryScene, reportScene_1.reportScene, advanceScene_1.advanceScene]);
