import * as vscode from "vscode";
import { themeFromColor } from "./commands/theme-from-color";
import { themeFromHex } from "./commands/theme-from-hex";
import { themeFromRandom } from "./commands/theme-from-random";
import { addCommand } from "./utils";

export function activate(context: vscode.ExtensionContext) {
  addCommand(context, "theme-from-color", () => themeFromColor());
  addCommand(context, "theme-from-hex", () => themeFromHex());
  addCommand(context, "theme-from-random", () => themeFromRandom());
}

export function deactivate() {}
