import { createContext } from 'react';

export enum Theme {
    DARK = 'app_dark_theme',
    LIGHT = 'app_light_theme',
    GREEN = 'app_green_theme'
}

export interface ThemeContextProps {
    theme?: Theme;
    setTheme?: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({});

export const LS_THEME_KEY = 'theme';
