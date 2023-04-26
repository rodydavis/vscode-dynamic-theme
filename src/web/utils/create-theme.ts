import {
    argbFromHex,
    DynamicScheme,
    SchemeTonalSpot,
    Hct,
    SchemeMonochrome,
    SchemeNeutral,
    SchemeVibrant,
    SchemeExpressive,
    SchemeFidelity,
    SchemeContent,
    MaterialDynamicColors,
    TonalPalette,
    Blend,
    CorePalette,
} from "@material/material-color-utilities";

export function createTheme({ seed, variant, contrast, customColors, blend, content }: {
    seed: string,
    contrast: number,
    variant?: Variant,
    blend?: boolean,
    content?: boolean,
    customColors?: { [key: string]: string },
}) {
    const source: Hct = Hct.fromInt(argbFromHex(seed));

    let lightScheme: DynamicScheme;
    let darkScheme: DynamicScheme;

    switch (variant ?? Variant.TONAL_SPOT) {
        case Variant.MONOCHROME:
            lightScheme = new SchemeMonochrome(source, false, contrast);
            darkScheme = new SchemeMonochrome(source, true, contrast);
            break;
        case Variant.NEUTRAL:
            lightScheme = new SchemeNeutral(source, false, contrast);
            darkScheme = new SchemeNeutral(source, true, contrast);
            break;
        case Variant.VIBRANT:
            lightScheme = new SchemeVibrant(source, false, contrast);
            darkScheme = new SchemeVibrant(source, true, contrast);
            break;
        case Variant.EXPRESSIVE:
            lightScheme = new SchemeExpressive(source, false, contrast);
            darkScheme = new SchemeExpressive(source, true, contrast);
            break;
        case Variant.FIDELITY:
            lightScheme = new SchemeFidelity(source, false, contrast);
            darkScheme = new SchemeFidelity(source, true, contrast);
            break;
        case Variant.CONTENT:
            lightScheme = new SchemeContent(source, false, contrast);
            darkScheme = new SchemeContent(source, true, contrast);
            break;
        case Variant.TONAL_SPOT:
            lightScheme = new SchemeTonalSpot(source, false, contrast);
            darkScheme = new SchemeTonalSpot(source, true, contrast);
            break;
        default:
            throw new Error(`Unknown variant: ${variant}`);
    }

    const custom: { [key: string]: CustomColor } = {};

    if (customColors) {
        for (const [key, value] of Object.entries(customColors)) {
            const seed = argbFromHex(value);
            let target = seed;

            if (blend === true) {
                target = Blend.harmonize(seed, source.toInt());
            }

            const palettes = content ? CorePalette.contentOf(target) : CorePalette.of(target);
            const palette = palettes.a1;

            custom[key] = {
                seed,
                target,
                palette,
                light: {
                    color: palette.tone(40),
                    onColor: palette.tone(100),
                    colorContainer: palette.tone(90),
                    onColorContainer: palette.tone(10),
                },
                dark: {
                    color: palette.tone(80),
                    onColor: palette.tone(20),
                    colorContainer: palette.tone(30),
                    onColorContainer: palette.tone(90),
                },
            };
        }
    }

    return {
        source: source.toInt(),
        contrast,
        variant,
        palettes: {
            primary: tonesToTonalGroup(lightScheme.primaryPalette),
            secondary: tonesToTonalGroup(lightScheme.secondaryPalette),
            tertiary: tonesToTonalGroup(lightScheme.tertiaryPalette),
            neutral: tonesToTonalGroup(lightScheme.neutralPalette),
            neutralVariant: tonesToTonalGroup(lightScheme.neutralVariantPalette),
            error: tonesToTonalGroup(lightScheme.errorPalette),
        },
        schemes: {
            light: convertDynamicScheme(lightScheme),
            dark: convertDynamicScheme(darkScheme),
        },
        custom,
    };
}

function tonesToTonalGroup(tones: TonalPalette) {
    const result: Map<number, number> = new Map();
    for (const tone of [
        100, 99, 98, 96, 95, 94, 92, 90, 87, 80, 70, 60, 50, 40,
        35, 30, 25, 24, 22, 20, 17, 12, 10, 6, 5, 4, 0,
    ]) {
        result.set(tone, tones.tone(tone));
    }
    return Object.fromEntries(result.entries());
}

function convertDynamicScheme(scheme: DynamicScheme): MaterialScheme {
    return {
        primary: MaterialDynamicColors.primary.getArgb(scheme),
        onPrimary: MaterialDynamicColors.onPrimary.getArgb(scheme),
        primaryContainer:
            MaterialDynamicColors.primaryContainer.getArgb(scheme),
        onPrimaryContainer:
            MaterialDynamicColors.onPrimaryContainer.getArgb(scheme),
        primaryFixed: MaterialDynamicColors.primaryFixed.getArgb(scheme),
        onPrimaryFixed: MaterialDynamicColors.onPrimaryFixed.getArgb(scheme),
        primaryFixedDim: MaterialDynamicColors.primaryFixedDim.getArgb(scheme),
        onPrimaryFixedVariant: MaterialDynamicColors.onPrimaryFixedVariant.getArgb(scheme),
        secondary: MaterialDynamicColors.secondary.getArgb(scheme),
        onSecondary: MaterialDynamicColors.onSecondary.getArgb(scheme),
        secondaryContainer:
            MaterialDynamicColors.secondaryContainer.getArgb(scheme),
        onSecondaryContainer:
            MaterialDynamicColors.onSecondaryContainer.getArgb(scheme),
        secondaryFixed: MaterialDynamicColors.secondaryFixed.getArgb(scheme),
        onSecondaryFixed: MaterialDynamicColors.onSecondaryFixed.getArgb(scheme),
        secondaryFixedDim: MaterialDynamicColors.secondaryFixedDim.getArgb(scheme),
        onSecondaryFixedVariant:
            MaterialDynamicColors.onSecondaryFixedVariant.getArgb(scheme),
        tertiary: MaterialDynamicColors.tertiary.getArgb(scheme),
        onTertiary: MaterialDynamicColors.onTertiary.getArgb(scheme),
        tertiaryContainer:
            MaterialDynamicColors.tertiaryContainer.getArgb(scheme),
        onTertiaryContainer:
            MaterialDynamicColors.onTertiaryContainer.getArgb(scheme),
        tertiaryFixed: MaterialDynamicColors.tertiaryFixed.getArgb(scheme),
        onTertiaryFixed: MaterialDynamicColors.onTertiaryFixed.getArgb(scheme),
        tertiaryFixedDim: MaterialDynamicColors.tertiaryFixedDim.getArgb(scheme),
        onTertiaryFixedVariant: MaterialDynamicColors.onTertiaryFixedVariant.getArgb(scheme),
        error: MaterialDynamicColors.error.getArgb(scheme),
        onError: MaterialDynamicColors.onError.getArgb(scheme),
        errorContainer:
            MaterialDynamicColors.errorContainer.getArgb(scheme),
        onErrorContainer:
            MaterialDynamicColors.onErrorContainer.getArgb(scheme),
        outline: MaterialDynamicColors.outline.getArgb(scheme),
        background: MaterialDynamicColors.background.getArgb(scheme),
        onBackground:
            MaterialDynamicColors.onBackground.getArgb(scheme),
        surface: MaterialDynamicColors.surface.getArgb(scheme),
        onSurface: MaterialDynamicColors.onSurface.getArgb(scheme),
        surfaceVariant:
            MaterialDynamicColors.surfaceVariant.getArgb(scheme),
        onSurfaceVariant:
            MaterialDynamicColors.onSurfaceVariant.getArgb(scheme),
        inverseSurface:
            MaterialDynamicColors.inverseSurface.getArgb(scheme),
        inverseOnSurface:
            MaterialDynamicColors.inverseOnSurface.getArgb(scheme),
        inversePrimary:
            MaterialDynamicColors.inversePrimary.getArgb(scheme),
        shadow: MaterialDynamicColors.shadow.getArgb(scheme),
        surfaceTint: MaterialDynamicColors.primary.getArgb(scheme),
        outlineVariant:
            MaterialDynamicColors.outlineVariant.getArgb(scheme),
        scrim: MaterialDynamicColors.scrim.getArgb(scheme),
        surfaceContainerHighest:
            MaterialDynamicColors.surfaceContainerHighest.getArgb(scheme),
        surfaceContainerHigh:
            MaterialDynamicColors.surfaceContainerHigh.getArgb(scheme),
        surfaceContainer:
            MaterialDynamicColors.surfaceContainer.getArgb(scheme),
        surfaceContainerLow:
            MaterialDynamicColors.surfaceContainerLow.getArgb(scheme),
        surfaceContainerLowest:
            MaterialDynamicColors.surfaceContainerLowest.getArgb(scheme),
        surfaceBright:
            MaterialDynamicColors.surfaceBright.getArgb(scheme),
        surfaceDim: MaterialDynamicColors.surfaceDim.getArgb(scheme),
    };
}

interface ColorFamily {
    color: number,
    onColor: number,
    colorContainer: number,
    onColorContainer: number,
}

interface CustomColor {
    seed: number,
    target: number,
    palette: TonalPalette,
    light: ColorFamily,
    dark: ColorFamily,
}

interface MaterialScheme {
    primary: number;
    onPrimary: number;
    primaryContainer: number;
    onPrimaryContainer: number;
    primaryFixed: number;
    onPrimaryFixed: number;
    primaryFixedDim: number;
    onPrimaryFixedVariant: number;
    secondary: number;
    onSecondary: number;
    secondaryContainer: number;
    onSecondaryContainer: number;
    secondaryFixed: number;
    onSecondaryFixed: number;
    secondaryFixedDim: number;
    onSecondaryFixedVariant: number;
    tertiary: number;
    onTertiary: number;
    tertiaryContainer: number;
    onTertiaryContainer: number;
    tertiaryFixed: number;
    onTertiaryFixed: number;
    tertiaryFixedDim: number;
    onTertiaryFixedVariant: number;
    error: number;
    onError: number;
    errorContainer: number;
    onErrorContainer: number;
    outline: number;
    background: number;
    onBackground: number;
    surface: number;
    onSurface: number;
    surfaceVariant: number;
    onSurfaceVariant: number;
    inverseSurface: number;
    inverseOnSurface: number;
    inversePrimary: number;
    shadow: number;
    surfaceTint: number;
    outlineVariant: number;
    scrim: number;
    surfaceContainerHighest: number;
    surfaceContainerHigh: number;
    surfaceContainer: number;
    surfaceContainerLow: number;
    surfaceContainerLowest: number;
    surfaceBright: number;
    surfaceDim: number;
}

export enum Variant {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    MONOCHROME = 0,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    NEUTRAL = 1,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    TONAL_SPOT = 2,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    VIBRANT = 3,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    EXPRESSIVE = 4,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    FIDELITY = 5,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    CONTENT = 6
}
