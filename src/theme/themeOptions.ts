import { createTheme, ThemeOptions } from '@mui/material/styles';

// Define shared color variables for consistency
const colors = {
    primary: '#00ADB5',
    secondary: '#5D646E',
    lightText: '#EEEEEE',
    darkText: '#222831',
    lightBackground: '#F1F1F1',
    darkBackground: '#222831',
};

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: colors.primary,
            contrastText: colors.lightText,
        },
        secondary: {
            main: colors.secondary,
        },
        text: {
            primary: colors.darkText,
            secondary: colors.darkText,
        },
        background: {
            default: '#FFFFFF',
            paper: colors.lightBackground,
        },
    }
};

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: colors.secondary,
            contrastText: colors.lightText,
        },
        secondary: {
            main: colors.primary,
        },
        text: {
            primary: colors.lightText,
            secondary: colors.darkText,
        },
        background: {
            default: colors.darkBackground,
            paper: colors.secondary,
        },
    }
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);