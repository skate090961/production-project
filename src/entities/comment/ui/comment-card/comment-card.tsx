import { memo } from 'react';

import { getRouteProfile } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/class-names/class-names';
import { AppLink } from '@/shared/ui/app-link';
import { Avatar } from '@/shared/ui/avatar';
import { Skeleton } from '@/shared/ui/skeleton';
import { Text, TextSize } from '@/shared/ui/text';

import { Comment } from '../../model/types/comment';

import styles from './comment-card.module.scss';

interface CommentCardProps {
    className?: string;
    comment: Comment;
    isLoading?: boolean;
}

export const CommentCard = memo((props: CommentCardProps) => {
    const {
        className,
        comment,
        isLoading,
    } = props;

    if (isLoading) {
        return (
            <article className={classNames(styles.root, [className, styles.loading])}>
                <div className={styles.header}>
                    <Skeleton width={30} height={30} radius="50%" />
                    <Skeleton width={100} height={16} />
                </div>
                <Skeleton height={50} />
            </article>
        );
    }

    return (
        <article className={classNames(styles.root, [className])}>
            <AppLink to={getRouteProfile(comment.user.id)} className={styles.header}>
                <Avatar size={30} src={comment.user.avatar} />
                <Text text={comment.user.username} size={TextSize.L} />
            </AppLink>

            <Text text={comment.text} />
        </article>
    );
});
