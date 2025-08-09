import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/button/button';
import { LangSwitcher } from '@/widgets/lang-switcher';
import { ThemeSwitcher } from '@/widgets/theme-switcher';

import { getSidebarItems } from '../../model/selectors/get-sidebar-items';
import { SidebarItemType } from '../../model/types/sidebar-items';
import { SidebarItem } from '../sidebar-item/sidebar-item';

import styles from './sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const sidebarItemList = useSelector(getSidebarItems);

    const onToggle = () => {
        setIsCollapsed((prev) => !prev);
    };

    const itemsList = useMemo(() => sidebarItemList.map((i: SidebarItemType) => (
        <SidebarItem
            key={i.path}
            item={i}
            collapsed={isCollapsed}
        />
    )), [isCollapsed, sidebarItemList]);

    return (
        <menu
            className={classNames(styles.root, [className], { [styles.collapsed]: isCollapsed })}
            aria-label="Боковая панель"
            data-testid="sidebar"
        >
            <ul className={styles.links}>
                {itemsList}
            </ul>
            <Button
                data-testid="sidebar-toggle"
                onClick={onToggle}
                className={styles.toggle}
                theme={ButtonTheme.BACKGROUND_INVERTED}
                size={ButtonSize.L}
                square
            >
                {isCollapsed ? '>' : '<'}
            </Button>
            <div className={styles.switchers}>
                <ThemeSwitcher />
                <LangSwitcher isShort={isCollapsed} />
            </div>
        </menu>
    );
});
