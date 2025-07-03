import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Button } from '@/shared/ui/button/button';
import { LangSwitcher } from '@/widgets/lang-switcher';
import { ThemeSwitcher } from '@/widgets/theme-switcher';

import styles from './sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { t } = useTranslation();

    const onToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    return (
        <aside
            className={classNames(styles.root, [className], { [styles.collapsed]: isCollapsed })}
            aria-label="Боковая панель"
            data-testid="sidebar"
        >
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
            >
                {t('Скрыть')}
            </Button>
            <div className={styles.switchers}>
                <ThemeSwitcher />
                <LangSwitcher />
            </div>
        </aside>
    );
};
