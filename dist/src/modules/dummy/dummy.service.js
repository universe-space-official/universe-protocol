"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var DummyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_pino_1 = require("nestjs-pino");
const error_1 = require("./../../utils/error");
let DummyService = DummyService_1 = class DummyService {
    constructor(pinoLogger) {
        this.pinoLogger = pinoLogger;
    }
    async boom() {
        try {
            throw new Error('aw shoot');
        }
        catch (e) {
            const error = error_1.toError(e);
            const message = 'it went boom';
            this.pinoLogger.error(`${message}: %o`, { error: error.message });
            throw new Error(message);
        }
    }
};
DummyService = DummyService_1 = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_pino_1.InjectPinoLogger(DummyService_1.name)),
    __metadata("design:paramtypes", [nestjs_pino_1.PinoLogger])
], DummyService);
exports.DummyService = DummyService;
//# sourceMappingURL=dummy.service.js.map