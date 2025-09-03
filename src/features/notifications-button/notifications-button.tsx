import { memo } from 'react';

import { NotificationList } from '@/entities/notification';
import BellIcon from '@/shared/assets/icons/bell.svg';
import { AppIcon, IconTheme } from '@/shared/ui/app-icon/app-icon';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Popover } from '@/shared/ui/popups';

import styles from './notifications-button.module.scss';

interface NotificationsButtonProps {
    className?: string;
}

export const NotificationsButton = memo(({ className }: NotificationsButtonProps) => (
    <Popover
        className={className}
        direction="bottomLeft"
        trigger={(
            <Button theme={ButtonTheme.CLEAR}>
                <AppIcon
                    Svg={BellIcon}
                    theme={IconTheme.INVERTED_PRIMARY}
                />
            </Button>
        )}
    >
        <NotificationList className={styles.notifications} />
    </Popover>
));
