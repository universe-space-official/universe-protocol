"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRateLimitModule = void 0;
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
function getRateLimitModule() {
    if (process.env.DISABLE_RATE_LIMITING) {
        return [];
    }
    return [
        throttler_1.ThrottlerModule.forRootAsync({
            imports: [config_1.ConfigModule],
            inject: [config_1.ConfigService],
            useFactory: (configService) => ({
                ttl: configService.get('THROTTLE_TTL'),
                limit: configService.get('THROTTLE_LIMIT'),
            }),
        }),
    ];
}
exports.getRateLimitModule = getRateLimitModule;
//# sourceMappingURL=get-rate-limit-module.js.map