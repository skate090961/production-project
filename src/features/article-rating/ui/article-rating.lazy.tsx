import { FC, lazy, Suspense } from 'react';

import { Skeleton } from '@/shared/ui/skeleton';

import { ArticleRatingProps } from './article-rating';

const Lazy = lazy<FC<ArticleRatingProps>>(
    () => import('./article-rating'),
);

export const ArticleRatingLazy = (props: ArticleRatingProps) => (
    <Suspense fallback={<Skeleton width="100%" height={140} />}>
        <Lazy {...props} />
    </Suspense>
);
