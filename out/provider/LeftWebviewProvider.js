"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeftWebviewProvider = void 0;
const vscode = require("vscode");
const Utils_1 = require("../utils/Utils");
class LeftWebviewProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView, context, token) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this.getHtmlContent(webviewView.webview);
    }
    getHtmlContent(webview) {
        const styleResetUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "global.css"));
        const styleVSCodeUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "assets", "vscode.css"));
        // Use a nonce to only allow a specific script to be run.
        const nonce = Utils_1.Utils.getNonce();
        return `<!DOCTYPE html>
                <html lang="pt-br">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <link rel="stylesheet" href="https://unpkg.com/modern-css-reset/dist/reset.min.css" />
                        <link href="https://fonts.googleapis.com/css2?family=Muli:wght@300;400;700&display=swap" rel="stylesheet">
                        <link href="${styleResetUri}" rel="stylesheet">
                        <link href="${styleVSCodeUri}" rel="stylesheet">     
                    </head>
                    <body>
                        <h4>Teste</h4>
                    </body>
                </html>`;
    }
}
exports.LeftWebviewProvider = LeftWebviewProvider;
LeftWebviewProvider.viewType = "vscodeSidebar.openview";
//# sourceMappingURL=LeftWebviewProvider.js.map