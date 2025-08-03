import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Text } from '@/shared/ui/text/text';

import { Comment } from '../../model/types/comment';
import { CommentCard } from '../comment-card/comment-card';

import styles from './comment-list.module.scss';

interface CommentListProps {
    className?: string;
    comments?: Comment[];
    isLoading?: boolean;
}

export const CommentList = memo((props: CommentListProps) => {
    const {
        className,
        comments,
        isLoading,
    } = props;

    const { t } = useTranslation();

    const renderComments = useMemo(() => comments?.map((c) => (
        <CommentCard
            comment={c}
            isLoading={isLoading}
        />
    )), [comments, isLoading]);

    return (
        <section className={classNames(styles.root, [className])}>
            {comments?.length ? renderComments : <Text text={t('Комментарии отсутствуют')} />}
        </section>
    );
});
