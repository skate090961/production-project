import { memo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Card } from '@/shared/ui/card/card';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';
import { HStack, VStack } from '@/shared/ui/stack';

import { ArticleView } from '../../model/types/article';

import styles from './article-list-item.module.scss';

interface ArticleListItemSkeletonProps {
    className?: string;
    view?: ArticleView;
}

export const ArticleListItemSkeleton = memo((props: ArticleListItemSkeletonProps) => {
    const {
        view = ArticleView.GRID,
        className,
    } = props;

    if (view === ArticleView.LIST) {
        return (
            <div className={classNames('', [className, styles[view]])}>
                <Card>
                    <VStack gap="8">
                        <HStack justify="between">
                            <HStack gap="8">
                                <Skeleton width={30} height={30} radius="50%" />
                                <Skeleton width={150} height={16} />
                            </HStack>
                            <Skeleton width={150} height={16} />
                        </HStack>
                        <div>
                            <Skeleton width={250} height={24} />
                        </div>
                        <Skeleton height={200} className={styles.img} />
                        <HStack justify="between">
                            <Skeleton width={200} height={36} />
                        </HStack>
                    </VStack>
                </Card>
            </div>
        );
    }

    if (view === ArticleView.GRID) {
        return (
            <div className={classNames(styles.root, [className, styles[view]])}>
                <Card>
                    <div className={styles.imgWrapper}>
                        <Skeleton width={200} height={200} />
                    </div>
                    <HStack className={styles.info} justify="between">
                        <Skeleton width={130} height={16} />
                    </HStack>
                    <Skeleton width={150} height={16} className={styles.title} />
                </Card>
            </div>
        );
    }

    return null;
});
