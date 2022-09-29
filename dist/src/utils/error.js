"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toError = void 0;
function toError(e) {
    if (e instanceof Error) {
        return e;
    }
    return new Error('Error Type Unknown: ' + e.toString());
}
exports.toError = toError;
//# sourceMappingURL=error.js.map