import { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/button/button';
import { VStack } from '@/shared/ui/stack';
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
        <aside
            className={classNames(styles.root, [className], { [styles.collapsed]: isCollapsed })}
            aria-label="Боковая панель"
            data-testid="sidebar"
        >
            <VStack
                role="navigation"
                className={styles.links}
                gap="32"
                align="center"
            >
                {itemsList}
            </VStack>
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
            <VStack
                className={styles.switchers}
                gap="32"
                justify="center"
            >
                <ThemeSwitcher />
                <LangSwitcher isShort={isCollapsed} />
            </VStack>
        </aside>
    );
});
