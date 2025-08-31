import { Menu } from '@headlessui/react';
import { ReactNode } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';
import { DropdownDirection } from '@/shared/types/ui';

import { HStack } from '../stack';

import { DropdownItem, IDropdownItem } from './dropdown-item';

import styles from './dropdown.module.scss';

interface DropdownProps {
    className?: string;
    trigger: ReactNode;
    items: IDropdownItem[];
    direction?: DropdownDirection;
}

const directionStyles: Record<DropdownDirection, string> = {
    bottomLeft: styles.bottomLeft,
    bottomRight: styles.bottomRight,
    topLeft: styles.topLeft,
    topRight: styles.topRight,
};

export const Dropdown = (props: DropdownProps) => {
    const {
        className,
        trigger,
        items,
        direction = 'bottomRight',
    } = props;

    return (
        <Menu as="menu" className={classNames(styles.root, [className])}>
            <HStack>
                <Menu.Button className={styles.trigger}>
                    {trigger}
                </Menu.Button>
            </HStack>
            <Menu.Items
                className={classNames(styles.items, [directionStyles[direction]])}
                as="div"
            >
                {items.map((i, index) => <DropdownItem item={i} key={index} />)}
            </Menu.Items>
        </Menu>
    );
};
