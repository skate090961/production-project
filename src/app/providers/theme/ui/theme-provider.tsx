import React, {
    PropsWithChildren, useEffect, useMemo, useState,
} from 'react';

import { THEME_LS_KEY } from '@/shared/consts/local-storage';

import { Theme, ThemeContext } from '../lib/theme-context';

const defaultTheme = localStorage.getItem(THEME_LS_KEY) as Theme || Theme.LIGHT;

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<Theme>(defaultTheme);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    const defaultProps = useMemo(() => ({
        theme,
        setTheme,
    }), [theme]);

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    );
};
