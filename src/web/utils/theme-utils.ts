import { Blend, CorePalette, Scheme } from "@guidezpl/material-color-utilities";

export interface CustomColor {
  value: number;
  name: string;
  blend: boolean;
}

export interface ColorGroup {
  color: number;
  onColor: number;
  colorContainer: number;
  onColorContainer: number;
}

export interface CustomColorGroup {
  color: CustomColor;
  value: number;
  light: ColorGroup;
  dark: ColorGroup;
}

export function customColor(
  seed: number,
  color: CustomColor
): CustomColorGroup {
  let value = color.value;
  const from = value;
  const to = seed;
  if (color.blend) {
    value = Blend.harmonize(from, to);
  }
  const palette = CorePalette.of(value);
  const tones = palette.a1;
  return {
    color,
    value,
    light: {
      color: tones.tone(40),
      onColor: tones.tone(100),
      colorContainer: tones.tone(90),
      onColorContainer: tones.tone(10),
    },
    dark: {
      color: tones.tone(80),
      onColor: tones.tone(20),
      colorContainer: tones.tone(30),
      onColorContainer: tones.tone(90),
    },
  };
}

export function themeFromSeed(seed: number, customColors: CustomColor[] = []) {
  const palette = CorePalette.of(seed);
  return {
    seed,
    schemes: {
      light: Scheme.light(seed),
      dark: Scheme.dark(seed),
    },
    palettes: {
      primary: palette.a1,
      secondary: palette.a2,
      tertiary: palette.a3,
      neutral: palette.n1,
      neutralVariant: palette.n2,
      error: palette.error,
    },
    customColors: customColors.map((c) => customColor(seed, c)),
  };
}
