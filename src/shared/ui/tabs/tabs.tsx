import { ReactNode } from 'react';

import { Card, CardTheme } from '../card/card';
import { HStack } from '../stack';

import styles from './tabs.module.scss';

export interface TabItem<T extends string> {
    value: T;
    content: ReactNode;
}

interface TabsProps<T extends string> {
    className?: string;
    tabs: TabItem<T>[];
    value: T;
    onTabClick: (tab: TabItem<T>) => void;
}

export const Tabs = <T extends string>(props: TabsProps<T>) => {
    const {
        className,
        value,
        onTabClick,
        tabs,
    } = props;

    return (
        <HStack className={className} gap="16">
            {tabs?.map((t) => (
                <Card
                    key={t.value}
                    theme={t.value === value ? CardTheme.NORMAL : CardTheme.OUTLINED}
                    onClick={() => onTabClick(t)}
                    className={styles.tab}
                >
                    {t.content}
                </Card>
            ))}
        </HStack>
    );
};
