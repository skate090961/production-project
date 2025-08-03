import { memo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';
import { Text, TextSize } from '@/shared/ui/text/text';

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
            <article className={classNames(styles.root, [className])}>
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
            <div className={styles.header}>
                <Avatar size={30} src={comment.user.avatar} />
                <Text text={comment.user.username} size={TextSize.L} />
            </div>
            <Text text={comment.text} />
        </article>
    );
});
