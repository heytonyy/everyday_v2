import { ColorTokens } from "./types";
import { PaletteColor, PaletteOptions } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { ThemeOptions } from "@mui/system";

// i hope i did this right... lmao
declare module "@mui/material/styles" {
  interface TypographyStyle {
    fontFamily?: React.CSSProperties["fontFamily"];
    fontSize?: React.CSSProperties["fontSize"];
    fontWeight?: React.CSSProperties["fontWeight"];
    letterSpacing?: React.CSSProperties["letterSpacing"];
    lineHeight?: React.CSSProperties["lineHeight"];
    textTransform?: React.CSSProperties["textTransform"];
  }

  interface Typography {
    fontFamily: string;
    fontSize: number;
    h1: TypographyStyle;
    h2: TypographyStyle;
    h3: TypographyStyle;
    h4: TypographyStyle;
    h5: TypographyStyle;
    h6: TypographyStyle;
  }

  interface TypeBackground {
    default: string;
    alt: string;
  }

  interface Palette {
    primary: PaletteColor;
    neutral: {
      dark: string;
      main: string;
      mediumMain: string;
      medium: string;
      light: string;
    };
    background: TypeBackground;
  }

  interface Theme {
    palette: Palette;
    typography: TypographyOptions;
  }

  interface ThemeOptions {
    palette?: PaletteOptions;
    typography?: TypographyOptions | ((palette: Palette) => TypographyOptions);
  }
}

// color design tokens export
export const colorTokens: ColorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

// mui theme settings
export const themeSettings = (mode: string): ThemeOptions => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
            },
            background: {
              default: colorTokens.grey[900],
              alt: colorTokens.grey[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
            },
            background: {
              default: colorTokens.grey[10],
              alt: colorTokens.grey[0],
            },
          }),
    },
    typography: {
      fontFamily: ["Rubik", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Rubik", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};
