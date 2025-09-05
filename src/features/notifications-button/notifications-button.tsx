import { memo, useCallback, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { NotificationList } from '@/entities/notification';
import BellIcon from '@/shared/assets/icons/bell.svg';
import { AppIcon, IconTheme } from '@/shared/ui/app-icon/app-icon';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Drawer } from '@/shared/ui/drawer/drawer';
import { Popover } from '@/shared/ui/popups';

import styles from './notifications-button.module.scss';

interface NotificationsButtonProps {
    className?: string;
}

export const NotificationsButton = memo(({ className }: NotificationsButtonProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggleDrawer = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    const trigger = (
        <Button
            theme={ButtonTheme.CLEAR}
            onClick={onToggleDrawer}
        >
            <AppIcon
                Svg={BellIcon}
                theme={IconTheme.INVERTED_PRIMARY}
            />
        </Button>
    );

    if (isMobile) {
        return (
            <>
                {trigger}
                <Drawer
                    isOpen={isOpen}
                    onClose={onToggleDrawer}
                    className={className}
                >
                    <NotificationList />
                </Drawer>
            </>

        );
    }

    return (
        <Popover
            className={className}
            direction="bottomLeft"
            trigger={trigger}
        >
            <NotificationList className={styles.notifications} />
        </Popover>
    );
});
