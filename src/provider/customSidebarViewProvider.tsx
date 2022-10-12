import * as vscode from "vscode";
import * as ReactDOMServer from 'react-dom/server';

import React = require("react");

import { Utils } from "../utils/Utils";

import { LeftPanel } from '../components/LeftPanel';

export class CustomSidebarViewProvider implements vscode.WebviewViewProvider {

  public static readonly viewType = "vscodeSidebar.openview";

  private _view?: vscode.WebviewView;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  resolveWebviewView(webviewView: vscode.WebviewView): void | Thenable<void> {
    this._view = webviewView;

    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };
    webviewView.webview.html = this.getHtmlContent(webviewView.webview);
  }

  private getHtmlContent(webview: vscode.Webview): string {
    // Get the local path to main script run in the webview,
    // then convert it to a uri we can use in the webview.
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "main.js")
    );

    const styleResetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "reset.css")
    );
    const styleVSCodeUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "vscode.css")
    );

    // Same for stylesheet
    const stylesheetUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "assets", "main.css")
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = Utils.getNonce();

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
				
        <link href="${stylesheetUri}" rel="stylesheet">
				
			</head>

			<body>
        ${           
          ReactDOMServer.renderToString((
            <LeftPanel message={"elemento foda em React"}></LeftPanel>
          ))
        }
			  <!--<script nonce="${nonce}" src="${scriptUri}"></script>-->
      </body>

			</html>`;
  }
}
