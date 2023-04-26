import * as fs from 'fs';
import { Variant, createTheme } from '../src/web/utils/create-theme';
import { SCHEME_TEMPLATE } from '../src/web/utils/scheme-template';
import { customColors } from '../src/web/utils/custom-colors';
import { randomColor } from '../src/web/utils/random-color';
import Mustache from 'mustache';
import { hexFromArgb } from '@material/material-color-utilities';

async function main() {
    const seed = '#6750A4';
    const variant = Variant.TONAL_SPOT;

    function saveTheme(contrast: number, suffix: string, file: string) {
        // Create near baseline theme
        const theme = createTheme({
            seed,
            customColors,
            contrast,
            variant,
            blend: true,
        });

        {
            // Light Theme
            const result = JSON.parse(JSON.stringify(theme, replacer, 2));
            const args = {
                ...result.schemes.light,
                description: `Light${suffix}`,
                custom: {},
            };
            for (const [key, value] of Object.entries<any>(result.custom)) {
                args['custom'][key] = value.light;
            }
            const output = Mustache.render(SCHEME_TEMPLATE, args);
            fs.writeFileSync(`./themes/material-theme-light-${file}-color-theme.json`, output, 'utf8');
        }

        {
            // Dark Theme
            const result = JSON.parse(JSON.stringify(theme, replacer, 2));
            const args = {
                ...result.schemes.dark,
                description: `Dark${suffix}`,
                custom: {},
            };
            for (const [key, value] of Object.entries<any>(result.custom)) {
                args['custom'][key] = value.dark;
            }
            const output = Mustache.render(SCHEME_TEMPLATE, args);
            fs.writeFileSync(`./themes/material-theme-dark-${file}-color-theme.json`, output, 'utf8');
        }
    }

    saveTheme(0, ' - Normal Contrast', 'default');
    saveTheme(1, ' - High Contrast', 'high');
    saveTheme(-1, ' - Low Contrast', 'low');
}

main();

function replacer(_: string, value: any) {
    if (typeof value === 'number') {
        return hexFromArgb(value);
    }
    return value;
}