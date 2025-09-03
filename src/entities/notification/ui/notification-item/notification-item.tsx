import { memo } from 'react';

import { getRedirectLink } from '@/shared/lib/url/get-redirect-link/get-redirect-link';
import { AppLink } from '@/shared/ui/app-link/app-link';
import { Card, CardTheme } from '@/shared/ui/card/card';
import { Text } from '@/shared/ui/text/text';

import { INotification } from '../../model/types/notification';

interface NotificationItemProps {
    className?: string;
    item: INotification;
}

export const NotificationItem = memo(({ className, item }: NotificationItemProps) => {
    const content = (
        <Card
            theme={CardTheme.OUTLINED}
            className={className}
        >
            <Text title={item.title} text={item.description} />
        </Card>
    );

    if (item.href) {
        const redirectLink = getRedirectLink(item.href);

        return (
            <AppLink
                to={redirectLink}
                target="_blank"
            >
                {content}
            </AppLink>
        );
    }

    return content;
});
