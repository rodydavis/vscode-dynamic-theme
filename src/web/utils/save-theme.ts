import * as vscode from "vscode";
import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
  CustomColor,
} from "@material/material-color-utilities";

interface Token {
  scope: string;
  settings: {
    foreground: string;
    fontStyle: string;
  };
}

export async function saveTheme(seed: string) {
  const ws = vscode.workspace;
  const currentThemeID =
    ws.getConfiguration().get<string>("workbench.colorTheme") || "";
  const description = currentThemeID.toLowerCase();
  const isDark = description.includes("dark") || true;
  const isContrast = description.includes("contrast") || false;

  const _config = vscode.workspace.getConfiguration();

  _config.update("dynamic-theme.seed", seed, true);

  const addCustom: (label: string, value: string) => CustomColor = (
    label,
    value
  ) => ({
    name: label,
    value: argbFromHex(value),
    blend: true,
  });

  const settings = _config.get("dynamic-theme", {});

  const getSetting = (key: string) => {
    return Object(settings)[key] || "#000000";
  };

  const extraColors = [
    addCustom("Info", getSetting("info")),
    addCustom("Warning", getSetting("warning")),
    addCustom("Comment", getSetting("comment")),
    addCustom("String", getSetting("string")),
    addCustom("Type", getSetting("type")),
    addCustom("Keyword", getSetting("keyword")),
    addCustom("Number", getSetting("number")),
    addCustom("Function", getSetting("function")),
    addCustom("Variable", getSetting("variable")),
  ];

  const theme = themeFromSourceColor(argbFromHex(seed), extraColors);
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;
  const customColors = theme.customColors;

  const getCustom = (name: string) => {
    const color = customColors.find((c) => c.color.name === name)!;
    return isDark ? color.dark : color.light;
  };

  const info = getCustom("Info");
  const warning = getCustom("Warning");

  const {
    primary,
    onPrimary,
    primaryContainer,
    onPrimaryContainer,
    secondary,
    onSecondary,
    secondaryContainer,
    onSecondaryContainer,
    tertiary,
    onTertiary,
    tertiaryContainer,
    onTertiaryContainer,
    error,
    // onError,
    errorContainer,
    onErrorContainer,
    background,
    onBackground,
    surface,
    onSurface,
    outline,
    surfaceVariant,
    onSurfaceVariant,
    shadow,
    inversePrimary,
    // inverseSurface,
    // inverseOnSurface,
  } = scheme;

  const themeKey = `[${currentThemeID}]`;
  const colors: { [key: string]: string } = {};
  const tokens: { [key: string]: string } = {};

  const addColor = (
    name: string,
    color: number,
    options?: {
      contrast: boolean;
    }
  ) => {
    if (!isContrast && options?.contrast) {
      return;
    }
    colors[name] = hexFromArgb(color);
  };

  const addToken = (
    name: string,
    color: number,
    options?: {
      contrast: boolean;
    }
  ) => {
    if (!isContrast && options?.contrast) {
      return;
    }
    tokens[name] = hexFromArgb(color);
  };

  // Set colors for theme
  // https://code.visualstudio.com/api/references/theme-color

  // Contrast colors
  addColor("contrastActiveBorder", primaryContainer, { contrast: true });
  addColor("contrastBorder", outline, { contrast: true });

  // Base colors
  addColor("focusBorder", primary);
  addColor("foreground", onSurface);
  addColor("widget.shadow", shadow);
  addColor("selection.background", inversePrimary);
  addColor("descriptionForeground", onPrimary);
  addColor("errorForeground", error);
  addColor("icon.foreground", onSurface);
  addColor("sash.hoverBorder", primary);

  // Window border
  addColor("window.activeBorder", primary);
  addColor("window.inactiveBorder", outline, { contrast: true });

  // Text colors
  addColor("textBlockQuote.background", secondaryContainer);
  addColor("textBlockQuote.border", outline, { contrast: true });
  addColor("textCodeBlock.background", secondaryContainer);
  addColor("textLink.activeForeground", outline, { contrast: true });
  addColor("textLink.foreground", secondary);
  addColor("textPreformat.foreground", onSurface);
  addColor("textSeparator.foreground", onSurface);

  // Action colors
  addColor("toolbar.hoverBackground", secondaryContainer);
  addColor("toolbar.hoverOutline", outline, { contrast: true });
  addColor("toolbar.activeBackground", secondary);

  // Button control
  addColor("button.background", secondaryContainer);
  addColor("button.foreground", onSecondaryContainer);
  addColor("button.border", outline, { contrast: true });
  addColor("button.hoverBackground", secondary);
  addColor("button.secondaryForeground", onTertiaryContainer);
  addColor("button.secondaryBackground", tertiaryContainer);
  addColor("button.secondaryHoverBackground", tertiary);
  addColor("checkbox.background", secondaryContainer);
  addColor("checkbox.foreground", onSecondaryContainer);
  addColor("checkbox.border", outline, { contrast: true });

  // Dropdown control
  addColor("dropdown.background", secondaryContainer);
  addColor("dropdown.listBackground", secondaryContainer);
  addColor("dropdown.border", outline, { contrast: true });
  addColor("dropdown.foreground", onSecondaryContainer);

  // Input control
  addColor("input.background", secondaryContainer);
  addColor("input.border", outline, { contrast: true });
  addColor("input.foreground", onSecondaryContainer);
  addColor("input.placeholderForeground", onSecondaryContainer);
  addColor("inputOption.activeBackground", inversePrimary);
  addColor("inputOption.activeBorder", outline, { contrast: true });
  addColor("inputOption.activeForeground", onSecondaryContainer);
  addColor("inputOption.hoverBackground", secondary);
  addColor("inputValidation.errorBackground", errorContainer);
  addColor("inputValidation.errorForeground", onErrorContainer);
  addColor("inputValidation.errorBorder", outline, { contrast: true });
  addColor("inputValidation.infoBackground", info.colorContainer);
  addColor("inputValidation.infoForeground", info.onColorContainer);
  addColor("inputValidation.infoBorder", outline, { contrast: true });
  addColor("inputValidation.warningBackground", warning.colorContainer);
  addColor("inputValidation.warningForeground", warning.onColorContainer);
  addColor("inputValidation.warningBorder", outline, { contrast: true });

  // Scrollbar control
  addColor("scrollbar.shadow", shadow);
  addColor("scrollbarSlider.activeBackground", secondary);
  addColor("scrollbarSlider.background", secondaryContainer);
  addColor("scrollbarSlider.hoverBackground", secondary);

  // Badge
  addColor("badge.background", primary);
  addColor("badge.foreground", onPrimary);

  // Progress bar
  addColor("progressBar.background", primary);

  // Lists and trees
  // "list.activeSelectionBackground": "#263238",
  // "list.activeSelectionForeground": "#80CBC4",
  // "list.dropBackground": "#f0717880",
  // "list.focusBackground": "#EEFFFF20",
  // "list.focusForeground": "#EEFFFF",
  // "list.highlightForeground": "#80CBC4",
  // "list.hoverBackground": "#263238",
  // "list.inactiveSelectionBackground": "#00000030",
  // "listFilterWidget.background": "#00000030",
  // "listFilterWidget.outline": "#00000030",
  // "listFilterWidget.noMatchesOutline": "#00000030"

  // Activity Bar
  addColor("activityBar.background", surface);
  addColor("activityBar.foreground", onSurface);
  addColor("activityBarBadge.background", primary);
  addColor("activityBarBadge.foreground", onPrimary);
  addColor("activityBar.dropBorder", secondary);

  // Side Bar
  addColor("sideBar.background", surface);
  addColor("sideBar.foreground", onSurface);
  addColor("sideBar.border", outline, { contrast: true });
  addColor("sideBar.dropBackground", secondaryContainer);
  addColor("sideBarTitle.foreground", onSurface);
  addColor("sideBarSectionHeader.background", secondaryContainer);
  addColor("sideBarSectionHeader.foreground", onSecondaryContainer);
  addColor("sideBarSectionHeader.border", outline, { contrast: true });

  // Minimap

  // Editor Groups & Tabs
  addColor("editorGroup.border", outline, { contrast: true });
  addColor("editorGroup.dropBackground", surfaceVariant);
  addColor("editorLineNumber.foreground", outline, { contrast: true });
  addColor("editorLineNumber.activeForeground", onSurface);

  // Editor colors
  addColor("editorGroup.border", outline, { contrast: true });
  addColor("editor.background", background);
  addColor("editor.foreground", onBackground);
  addColor("editor.selectionBackground", surfaceVariant);
  addColor("editor.selectionForeground", onSurfaceVariant);
  addColor("editorGroupHeader.tabsBackground", surface);
  addColor("editorGroupHeader.tabsBorder", outline, { contrast: true });
  addColor("tab.inactiveBackground", surface);
  addColor("tab.inactiveForeground", onSurface);
  addColor("tab.activeBackground", secondaryContainer);
  addColor("tab.activeForeground", onSecondaryContainer);
  addColor("tab.hoverBackground", surfaceVariant);
  addColor("tab.hoverForeground", onSurfaceVariant);

  // Diff editor colors

  // Editor widget colors

  // Peek view colors

  // Merge conflicts colors

  // Panel colors
  addColor("panel.background", surface);
  addColor("panel.border", outline, { contrast: true });
  addColor("panel.dropBorder", secondary);
  addColor("panelTitle.activeBorder", primary);
  addColor("panelTitle.activeForeground", onSurface);
  addColor("panelTitle.inactiveForeground", outline, { contrast: true });
  addColor("panelInput.border", outline, { contrast: true });
  addColor("panelSection.border", outline, { contrast: true });

  // Status Bar colors
  addColor("statusBar.background", surface);
  addColor("statusBar.foreground", onSurface);
  addColor("statusBar.debuggingBackground", tertiary);
  addColor("statusBar.debuggingForeground", onTertiary);
  addColor("statusBarItem.remoteBackground", primary);
  addColor("statusBarItem.remoteForeground", onPrimary);

  // Title Bar colors
  addColor("titleBar.activeBackground", surface);
  addColor("titleBar.activeForeground", onSurface);
  addColor("titleBar.inactiveBackground", surface);
  addColor("titleBar.inactiveForeground", onSurface);
  addColor("titleBar.border", outline, { contrast: true });

  // Menu Bar colors
  // "menu.background": "#263238",
  // "menu.foreground": "#EEFFFF",
  // "menu.selectionBackground": "#00000050",
  // "menu.selectionForeground": "#80CBC4",
  // "menu.selectionBorder": "#00000030",
  // "menu.separatorBackground": "#EEFFFF",
  // "menubar.selectionBackground": "#00000030",
  // "menubar.selectionForeground": "#80CBC4",
  // "menubar.selectionBorder": "#00000030",

  // Notification colors
  addColor("notificationCenter.border", outline, { contrast: true });
  addColor("notificationCenterHeader.foreground", onSecondary);
  addColor("notificationCenterHeader.background", secondary);
  addColor("notificationToast.border", outline, { contrast: true });
  addColor("notifications.foreground", onSurface);
  addColor("notifications.background", surface);
  addColor("notifications.border", outline, { contrast: true });
  addColor("notificationLink.foreground", primaryContainer);
  addColor("notificationsErrorIcon.foreground", errorContainer);
  addColor("notificationsWarningIcon.foreground", warning.colorContainer);
  addColor("notificationsInfoIcon.foreground", info.colorContainer);

  // Banner colors
  addColor("banner.background", tertiary);
  addColor("banner.foreground", onTertiary);

  // Extensions colors

  // Quick picker colors
  addColor("pickerGroup.border", outline, { contrast: true });
  addColor("pickerGroup.foreground", onSurface);
  addColor("quickInput.background", surface);
  addColor("quickInput.foreground", onSurface);
  addColor("quickInputList.focusBackground", primaryContainer);
  addColor("quickInputList.focusForeground", onPrimaryContainer);
  addColor("quickInputList.focusIconForeground", onPrimaryContainer);
  addColor("quickInputTitle.background", surface);

  // Keybinding label colors

  // Keyboard shortcut table colors

  // Integrated Terminal colors
  // "terminal.ansiBlack": "#000000",
  // "terminal.ansiBlue": "#82AAFF",
  // "terminal.ansiBrightBlack": "#546E7A",
  // "terminal.ansiBrightBlue": "#82AAFF",
  // "terminal.ansiBrightCyan": "#89DDFF",
  // "terminal.ansiBrightGreen": "#C3E88D",
  // "terminal.ansiBrightMagenta": "#C792EA",
  // "terminal.ansiBrightRed": "#f07178",
  // "terminal.ansiBrightWhite": "#ffffff",
  // "terminal.ansiBrightYellow": "#FFCB6B",
  // "terminal.ansiCyan": "#89DDFF",
  // "terminal.ansiGreen": "#C3E88D",
  // "terminal.ansiMagenta": "#C792EA",
  // "terminal.ansiRed": "#f07178",
  // "terminal.ansiWhite": "#ffffff",
  // "terminal.ansiYellow": "#FFCB6B",

  // Debug colors
  // "debugToolBar.background": "#263238",
  // "debugConsole.errorForeground": "#f07178",
  // "debugConsole.infoForeground": "#89DDFF",
  // "debugConsole.warningForeground": "#FFCB6B",

  // Testing colors

  // Welcome page colors
  addColor("welcomePage.background", surface);
  addColor("welcomePage.progress.background", primaryContainer);
  addColor("welcomePage.progress.foreground", primary);
  addColor("welcomePage.tileBackground", surfaceVariant);
  addColor("welcomePage.tileHoverBackground", inversePrimary);
  addColor("welcomePage.tileShadow", shadow);
  addColor("walkThrough.embeddedEditorBackground", surface);

  // Source Control colors

  // Git colors
  // "gitDecoration.deletedResourceForeground": "#f0717890",
  // "gitDecoration.conflictingResourceForeground": "#FFCB6B90",
  // "gitDecoration.modifiedResourceForeground": "#82AAFF90",
  // "gitDecoration.untrackedResourceForeground": "#C3E88D90",
  // "gitDecoration.ignoredResourceForeground": "#607a8690",

  // Settings Editor colors

  // Breadcrumbs colors

  // Snippets colors

  // Symbol Icons colors

  // Debug Icons colors

  // Notebook colors

  // Chart colors

  // Ports Colors

  // Extension colors

  // Token colors
  addToken("comments", getCustom("Comment").color);
  addToken("strings", getCustom("String").color);
  addToken("keywords", getCustom("Keyword").color);
  addToken("numbers", getCustom("Number").color);
  addToken("types", getCustom("Type").color);
  addToken("functions", getCustom("Function").color);
  addToken("variables", getCustom("Variable").color);

  const _tokens: Token[] = [];
  // _tokens.push({
  //   scope: "comment",
  //   settings: {
  //     foreground: "#dd0000",
  //     fontStyle: "italic",
  //   },
  // });

  await updateSettings("workbench.colorCustomizations", {
    ...vscode.workspace.getConfiguration().get("workbench.colorCustomizations"),
    [themeKey]: colors,
  });

  await updateSettings("editor.tokenColorCustomizations", {
    ...vscode.workspace
      .getConfiguration()
      .get("editor.tokenColorCustomizations"),
    [themeKey]: { ...tokens, textMateRules: _tokens },
  });

  vscode.window.showInformationMessage("Theme Updated!");
}

const updateSettings = async (key: string, config: any) => {
  try {
    await vscode.workspace.getConfiguration().update(key, config, true);
    return true;
  } catch (error) {
    await vscode.window.showErrorMessage(error as string);
  }
  return false;
};
