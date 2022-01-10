"use strict";
exports.__esModule = true;
exports.stage = void 0;
var telegraf_1 = require("telegraf");
var advanceScene_1 = require("./advanceScene");
var reportScene_1 = require("./reportScene");
var salaryScene_1 = require("./salaryScene");
exports.stage = new telegraf_1.Scenes.Stage([salaryScene_1.salaryScene, reportScene_1.reportScene, advanceScene_1.advanceScene]);
