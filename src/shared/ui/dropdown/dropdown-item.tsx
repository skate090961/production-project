import { Menu } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import { AppLink } from '../app-link/app-link';

import styles from './dropdown.module.scss';

export interface IDropdownItem {
    disabled?: boolean;
    content?: ReactNode;
    onClick?: () => void;
    href?: string;
}

interface DropdownItemProps {
    item: IDropdownItem
}

export const DropdownItem = ({ item }: DropdownItemProps) => {
    const content = ({ active }: { active: boolean }) => {
        const mods = {
            [styles.active]: active,
            [styles.disabled]: item.disabled,
        };
        if (item.href) {
            return (
                <AppLink
                    to={item.href}
                    className={classNames(styles.item, [], { ...mods })}
                    onClick={item.onClick}
                >
                    {item.content}
                </AppLink>
            );
        }

        return (
            <button
                onClick={item.onClick}
                type="button"
                className={classNames(styles.item, [], { ...mods })}
                disabled={item.disabled}
            >
                {item.content}
            </button>
        );
    };

    return (
        <Menu.Item disabled={item.disabled} as={Fragment}>
            {content}
        </Menu.Item>
    );
};
