import { rtkApi } from '@/shared/api/rtk-api';

import { INotification } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getNotifications: build.query<INotification[], string>({
            query: (userId) => ({
                url: '/notifications',
                params: {
                    userId,
                },
            }),
        }),
    }),
});

export const { useGetNotificationsQuery } = notificationApi;
