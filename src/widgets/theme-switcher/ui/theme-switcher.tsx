import { memo } from 'react';

import { Theme, useTheme } from '@/app/providers/theme';
import MoonIcon from '@/shared/assets/icons/moon.svg';
import SunIcon from '@/shared/assets/icons/sun.svg';
import { AppIcon, IconTheme } from '@/shared/ui/app-icon';
import { Button, ButtonTheme } from '@/shared/ui/button';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();

    const icon = theme === Theme.LIGHT
        ? <AppIcon Svg={MoonIcon} theme={IconTheme.INVERTED_PRIMARY} />
        : <AppIcon Svg={SunIcon} theme={IconTheme.INVERTED_PRIMARY} />;

    return (
        <Button
            onClick={toggleTheme}
            className={className}
            theme={ButtonTheme.CLEAR}
        >
            {icon}
        </Button>
    );
});
