import { Popover as HPopover } from '@headlessui/react';
import { memo, PropsWithChildren, ReactNode } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';
import { DropdownDirection } from '@/shared/types/ui';

import { HStack } from '../../../stack';
import { directionStyles } from '../../styles/consts';

import popupStyles from '../../styles/popup.module.scss';
import styles from './popover.module.scss';

interface PopoverProps extends PropsWithChildren {
    className?: string;
    trigger: ReactNode;
    direction?: DropdownDirection;
}

export const Popover = memo((props: PopoverProps) => {
    const {
        className,
        trigger,
        direction = 'bottomRight',
        children,
    } = props;

    return (
        <HPopover as="div" className={classNames(popupStyles.root, [className])}>
            <HStack>
                <HPopover.Button className={popupStyles.trigger}>
                    {trigger}
                </HPopover.Button>
            </HStack>
            <HPopover.Panel
                className={classNames(styles.panel, [directionStyles[direction]])}
                as="div"
            >
                {children}
            </HPopover.Panel>
        </HPopover>
    );
});
