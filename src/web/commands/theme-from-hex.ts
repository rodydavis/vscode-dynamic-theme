import * as vscode from "vscode";
import { setTheme } from "../utils/set-theme";

export async function themeFromHex() {
  const seed = await vscode.window.showInputBox({
    prompt: "Enter seed color",
    value: "#6750A4",
  });

  if (!seed) {
    return;
  }

  if (!/^#[0-9A-F]{6}$/i.test(seed)) {
    await vscode.window.showErrorMessage(
      "Invalid seed color. Please enter a valid hex color code."
    );
    return;
  }

  setTheme(seed);
}
