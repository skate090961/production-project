import { memo } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/user';
import { Skeleton } from '@/shared/ui/skeleton';
import { VStack } from '@/shared/ui/stack';

import { useGetNotificationsQuery } from '../../api/notification-api';
import { NotificationItem } from '../notification-item/notification-item';

interface NotificationListProps {
    className?: string;
}

const POLLING_INTERVAL = 5000;

export const NotificationList = memo(({ className }: NotificationListProps) => {
    const authData = useSelector(getUserAuthData);

    const {
        data: notifications,
        isLoading,
    } = useGetNotificationsQuery(authData!.id, {
        pollingInterval: POLLING_INTERVAL,
    });

    if (isLoading) {
        return (
            <VStack className={className} gap="8">
                <Skeleton width="100%" radius="8px" height="80px" />
                <Skeleton width="100%" radius="8px" height="80px" />
                <Skeleton width="100%" radius="8px" height="80px" />
            </VStack>
        );
    }

    return (
        <VStack className={className} gap="8">
            {notifications?.map((n) => (
                <NotificationItem
                    key={n.id}
                    item={n}
                />
            ))}
        </VStack>
    );
});
