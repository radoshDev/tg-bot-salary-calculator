"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAllowUser = void 0;
const constants_1 = require("../constants");
const isAllowUser = (userId) => {
    return constants_1.ALLOWED_USER_LIST.includes(userId);
};
exports.isAllowUser = isAllowUser;
