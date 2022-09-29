"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggerConfig = void 0;
const constants_1 = require("../constants");
function getLoggerConfig(configService) {
    const appEnv = configService.get('APP_ENV');
    const isProductionEnv = appEnv === constants_1.AppEnvs.PRODUCTION;
    const isTestEnv = appEnv === constants_1.AppEnvs.TEST;
    const isDevEnv = appEnv === constants_1.AppEnvs.DEVELOPMENT;
    const forRoutes = isTestEnv ? [] : ['(.*)'];
    return {
        pinoHttp: {
            level: !isProductionEnv ? 'debug' : 'info',
            redact: ['req.headers.cookie', 'req.headers.authorization'],
            transport: {
                target: isDevEnv ? 'pino-pretty' : undefined,
            },
        },
        forRoutes,
    };
}
exports.getLoggerConfig = getLoggerConfig;
//# sourceMappingURL=get-logger.config.js.map