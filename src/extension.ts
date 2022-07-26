import * as vscode from 'vscode';

import { LeftWebviewProvider } from './provider/LeftWebviewProvider';

export function activate(context: vscode.ExtensionContext) {

	const provider = new LeftWebviewProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider(
			LeftWebviewProvider.viewType,
		  provider
		)
	  );

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('databox-vscode-extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from databox-vscode-extension!');
	});

	context.subscriptions.push(disposable);

	//Register view
	let openWebView = vscode.commands.registerCommand('vscodeSidebar.openview', () => {
		// Display a message box to the user
		vscode.window.showInformationMessage('Command " Sidebar View [vscodeSidebar.openview] " called.');
	});

	context.subscriptions.push(openWebView);
}

// this method is called when your extension is deactivated
export function deactivate() {}
