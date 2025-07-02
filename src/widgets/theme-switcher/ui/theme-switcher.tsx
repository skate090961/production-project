import { Theme, useTheme } from '@/app/providers/theme';
import MoonIcon from '@/shared/assets/icons/moon.svg';
import SunIcon from '@/shared/assets/icons/sun.svg';
import { classNames } from '@/shared/lib/class-names/class-names';
import { Button } from '@/shared/ui/button';
import { ThemeButton } from '@/shared/ui/button/ui/button';

import styles from './theme-switcher.module.scss';

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const { toggleTheme, theme } = useTheme();

    const icon = theme === Theme.LIGHT
        ? <MoonIcon className={styles.icon} />
        : <SunIcon className={styles.icon} />;

    return (
        <Button
            onClick={toggleTheme}
            className={classNames(styles.root, [className])}
            theme={ThemeButton.CLEAR}
        >
            {icon}
        </Button>
    );
};
