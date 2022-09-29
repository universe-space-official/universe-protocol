"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
const Joi = __importStar(require("joi"));
const constants_1 = require("../constants");
exports.configSchema = Joi.object({
    APP_ENV: Joi.string()
        .valid(constants_1.AppEnvs.DEVELOPMENT, constants_1.AppEnvs.TEST, constants_1.AppEnvs.PRODUCTION)
        .required(),
    PORT: Joi.number().when('APP_ENV', {
        is: constants_1.AppEnvs.DEVELOPMENT,
        then: Joi.required(),
    }),
    SENTRY_DSN: Joi.string().when('APP_ENV', {
        is: constants_1.AppEnvs.PRODUCTION,
        then: Joi.required(),
    }),
    SENTRY_DEBUG: Joi.any().optional(),
    DISABLE_SENTRY: Joi.boolean().optional(),
    THROTTLE_TTL: Joi.number().required(),
    THROTTLE_LIMIT: Joi.number().required(),
    DISABLE_RATE_LIMITING: Joi.boolean().optional(),
});
//# sourceMappingURL=config-schema.js.map