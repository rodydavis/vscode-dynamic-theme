import * as vscode from "vscode";
import { saveTheme } from "../utils/save-theme";

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

  saveTheme(seed);
}

function randomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
