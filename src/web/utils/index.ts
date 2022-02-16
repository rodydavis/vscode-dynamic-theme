import * as vscode from "vscode";
import { Buffer } from "buffer";

export function addCommand(
  context: vscode.ExtensionContext,
  cmd: string,
  callback: (...args: any[]) => any
) {
  let disposable = vscode.commands.registerCommand(
    `dynamic-theme.${cmd}`,
    () => callback()
  );
  context.subscriptions.push(disposable);
}

export function showMessage(message: string) {
  vscode.window.showInformationMessage(message);
}

export function showErrorMessage(message: string) {
  vscode.window.showErrorMessage(message);
}

export async function readDir(uri: vscode.Uri, files: string[]) {
  const stat = await vscode.workspace.fs.stat(uri);
  if (stat.type === vscode.FileType.Directory) {
    const children = await vscode.workspace.fs.readDirectory(uri);
    for (const [childPath] of children) {
      await readDir(vscode.Uri.parse(`${uri.fsPath}/${childPath}`), files);
    }
  } else {
    files.push(uri.fsPath);
  }
}

export async function writeFile(path: string, contents: string) {
  await vscode.workspace.fs.writeFile(
    vscode.Uri.parse(path),
    Buffer.from(contents)
  );
}

export async function readFile(path: string) {
  const raw = await vscode.workspace.fs.readFile(vscode.Uri.parse(path));
  const contents = Buffer.from(raw).toString("utf8");
  return contents;
}

export function getSetting<T = unknown>(key: string) {
  return vscode.workspace.getConfiguration("dynamic-theme").get<T>(key) || undefined;
}