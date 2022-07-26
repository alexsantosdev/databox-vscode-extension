"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
/* eslint-disable @typescript-eslint/naming-convention */
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.Utils = {
    getNonce,
};
//# sourceMappingURL=Utils.js.map