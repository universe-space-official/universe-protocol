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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DummyController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const dummy_service_1 = require("./dummy.service");
let DummyController = class DummyController {
    constructor(dummyService) {
        this.dummyService = dummyService;
    }
    findAll() {
        return ['foo', 'bar', 'baz'];
    }
    findbyUuid(dummyUuidString) {
        return `Some dummy with uuid string: ${dummyUuidString}`;
    }
    create(body) {
        return `Create some dummy with attributes ${body}`;
    }
    boom() {
        return this.dummyService.boom();
    }
};
__decorate([
    swagger_1.ApiOperation({
        description: 'Get all dummies',
    }),
    swagger_1.ApiOkResponse({
        description: 'Success!',
        status: 200,
        type: String,
        isArray: true,
    }),
    common_1.Get(),
    common_1.HttpCode(200),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], DummyController.prototype, "findAll", null);
__decorate([
    swagger_1.ApiOperation({
        description: 'Get an existing dummy by id',
    }),
    swagger_1.ApiOkResponse({
        description: 'Success!',
        status: 200,
        type: String,
    }),
    swagger_1.ApiUnauthorizedResponse({
        description: 'Invalid credentials provided.',
    }),
    common_1.Get(':dummyUuidString'),
    common_1.HttpCode(200),
    __param(0, common_1.Param('dummyUuidString')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], DummyController.prototype, "findbyUuid", null);
__decorate([
    swagger_1.ApiOperation({
        description: 'Create a dummy',
    }),
    swagger_1.ApiOkResponse({
        description: 'Success!',
        status: 200,
        type: String,
    }),
    swagger_1.ApiUnauthorizedResponse({
        description: 'Invalid credentials provided.',
    }),
    common_1.Post(),
    common_1.HttpCode(200),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], DummyController.prototype, "create", null);
__decorate([
    common_1.Get('/boom'),
    swagger_1.ApiOperation({
        description: 'Example dummy error',
    }),
    swagger_1.ApiInternalServerErrorResponse({ description: 'It go boom' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DummyController.prototype, "boom", null);
DummyController = __decorate([
    common_1.Controller('v1/dummies'),
    __metadata("design:paramtypes", [dummy_service_1.DummyService])
], DummyController);
exports.DummyController = DummyController;
//# sourceMappingURL=dummy.controller.js.map