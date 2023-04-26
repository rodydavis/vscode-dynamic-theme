import * as vscode from "vscode";
import { hexFromArgb } from "@material/material-color-utilities";
import { customColors } from './custom-colors';
import { Variant, createTheme } from './create-theme';
import { SCHEME_TEMPLATE } from "./scheme-template";
import Mustache from "mustache";

export async function setTheme(seed: string) {
    const ws = vscode.workspace;
    const variantsOptions: { [key: string]: Variant } = {
        'Tonal Spot': Variant.TONAL_SPOT,
        'Monochrome': Variant.MONOCHROME,
        'Content': Variant.CONTENT,
        'Expressive': Variant.EXPRESSIVE,
        'Neutral': Variant.NEUTRAL,
        'Vibrant': Variant.VIBRANT,
    };
    const variantSelection = async (): Promise<string | undefined> => {
        const options: string[] = Object.keys(variantsOptions);
        return vscode.window.showQuickPick(options, {
            title: 'Select a variant',
        });
    };
    const variantOption = await variantSelection();
    const variant = variantsOptions[variantOption || 'Tonal Spot'];

    const brightnessSelection = async (): Promise<string | undefined> => {
        const options: string[] = [
            'Light (Low Contrast)',
            'Light (Normal Contrast)',
            'Light (High Contrast)',
            'Light (Custom Contrast)',
            'Dark (Low Contrast)',
            'Dark (Normal Contrast)',
            'Dark (High Contrast)',
            'Dark (Custom Contrast)',
        ];
        return vscode.window.showQuickPick(options, {
            title: 'Select a brightness',
        });
    };
    const brightnessOption = await brightnessSelection();
    const isDark = brightnessOption?.includes('Dark');
    const isHighContrast = brightnessOption?.includes('High Contrast');
    const isLowContrast = brightnessOption?.includes('Low Contrast');
    const isCustomContrast = brightnessOption?.includes('Custom Contrast');

    let contrast = 0;

    if (isCustomContrast) {
        const level = await vscode.window.showInputBox({
            title: 'Enter a contrast level between -1 and 1',
        });
        if (level) {
            const target = parseFloat(level);
            if (target >= -1 && target <= 1) {
                contrast = target;
            }
        }
    } else if (isHighContrast) {
        contrast = 1;
    } else if (isLowContrast) {
        contrast = -1;
    }

    const _config = ws.getConfiguration();
    _config.update("dynamic-theme.seed", seed, true);
    _config.update("dynamic-theme.variant", variant, true);
    _config.update("dynamic-theme.contrast", contrast, true);

    const theme = createTheme({
        seed,
        customColors,
        contrast,
        variant,
        blend: true,
    });

    const result = JSON.parse(JSON.stringify(theme, replacer, 2));
    const args = {
        ...(isDark ? result.schemes.dark : result.schemes.light),
        description: theme,
        custom: {},
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'high_contrast': contrast > 0,
    };
    for (const [key, value] of Object.entries<any>(result.custom)) {
        args['custom'][key] = isDark ? value.dark : value.light;
    }
    const output = Mustache.render(SCHEME_TEMPLATE, args);
    const outputJson = JSON.parse(output)['colors'];

    await updateSettings("workbench.colorCustomizations", {
        ..._config.get("workbench.colorCustomizations"),
        ...outputJson,
    });
}

const updateSettings = async (key: string, config: any) => {
    try {
        await vscode.workspace.getConfiguration().update(key, config, true);
        vscode.window.showInformationMessage(`Themes Updated!`);
        return true;
    } catch (error) {
        await vscode.window.showErrorMessage(`${error}`);
    }
    return false;
};


function replacer(_: string, value: any) {
    if (typeof value === 'number') {
        return hexFromArgb(value);
    }
    return value;
}