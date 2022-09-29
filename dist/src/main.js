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
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const Sentry = __importStar(require("@sentry/node"));
const config_1 = require("@nestjs/config");
const nestjs_pino_1 = require("nestjs-pino");
const swagger_1 = require("@nestjs/swagger");
const nestjs_pino_2 = require("nestjs-pino");
const app_module_1 = require("./app.module");
const constants_1 = require("./constants");
const get_sentry_config_1 = require("./config/get-sentry-config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter());
    const configService = app.get(config_1.ConfigService);
    if (!Boolean(configService.get('DISABLE_SENTRY'))) {
        Sentry.init(get_sentry_config_1.getSentryConfig(configService));
    }
    await app.resolve(nestjs_pino_1.PinoLogger);
    if (configService.get('APP_ENV') !== constants_1.AppEnvs.PRODUCTION) {
        const options = new swagger_1.DocumentBuilder()
            .setTitle('{{template}} Service')
            .setDescription('A NestJS Olyvia template repo built with ❤.')
            .setVersion('1.0')
            .addTag('{{template}}')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api', app, document);
    }
    app.useLogger(app.get(nestjs_pino_2.Logger));
    await app.init();
    await app.listen(configService.get('PORT'), '0.0.0.0');
}
bootstrap();
//# sourceMappingURL=main.js.map