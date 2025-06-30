import {LS_THEME_KEY, Theme, ThemeContext} from "./theme-context";
import {useContext} from "react";

interface UseThemeResult {
    toggleTheme: () => void;
    theme: Theme;
}

export function useTheme(): UseThemeResult {
    const {theme, setTheme} = useContext(ThemeContext);

    const toggleTheme = () => {
        const selectedTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
        setTheme(selectedTheme);
        localStorage.setItem(LS_THEME_KEY, selectedTheme);
    }

    return {
        theme,
        toggleTheme
    }
}