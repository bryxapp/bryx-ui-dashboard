import { createTheme, ThemeOptions } from '@mui/material/styles';

const lightThemeOptions: ThemeOptions = {
    palette: {
        mode: 'light',
        primary: {
            main: '#00ADB5',
            contrastText: '#EEEEEE',
        },
        secondary: {
            main: '#393E46',
        },
        text: {
            primary: '#222831',
            secondary: '#393E46',
        },
        background: {
            default: '#f4f6f8',
            paper: '#e5e5e5',
        },
    }
};

const darkThemeOptions: ThemeOptions = {
    palette: {
        mode: 'dark',
        primary: {
            main: '#00ADB5',
            contrastText: '#EEEEEE',
        },
        secondary: {
            main: '#EEEEEE',
        },
        text: {
            primary: '#EEEEEE',
            secondary: '#BDBDBD',
        },
        background: {
            default: '#222831',
            paper: '#393E46',
        }
    },
};

export const lightTheme = createTheme(lightThemeOptions);
export const darkTheme = createTheme(darkThemeOptions);
