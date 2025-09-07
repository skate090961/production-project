import { FC, lazy, Suspense } from 'react';

import { Skeleton } from '@/shared/ui/skeleton';

import { ProfileRatingProps } from './profile-rating';

const Lazy = lazy<FC<ProfileRatingProps>>(
    () => import('./profile-rating'),
);

export const ProfileRatingLazy = (props: ProfileRatingProps) => (
    <Suspense fallback={<Skeleton width="100%" height={140} />}>
        <Lazy {...props} />
    </Suspense>
);
