import * as vscode from "vscode";
import { setTheme } from "../utils/set-theme";
import { randomColor } from "../utils/random-color";

export async function themeFromRandom() {
  const seed = randomColor();

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
