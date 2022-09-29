"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSentryConfig = void 0;
const constants_1 = require("../constants");
function getSentryConfig(configService) {
    const appEnv = configService.get('APP_ENV');
    const isDevEnv = appEnv === constants_1.AppEnvs.DEVELOPMENT;
    return {
        dsn: configService.get('SENTRY_DSN'),
        environment: configService.get('APP_ENV'),
        debug: isDevEnv,
        release: configService.get('SENTRY_RELEASE'),
    };
}
exports.getSentryConfig = getSentryConfig;
//# sourceMappingURL=get-sentry-config.js.map