import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { VStack } from '@/shared/ui/stack';
import { Text } from '@/shared/ui/text/text';

import { Comment } from '../../model/types/comment';
import { CommentCard } from '../comment-card/comment-card';

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
            key={c.id}
            comment={c}
            isLoading={isLoading}
        />
    )), [comments, isLoading]);

    return (
        <section className={className}>
            <VStack gap="16">
                {comments?.length ? renderComments : <Text text={t('Комментарии отсутствуют')} />}
            </VStack>
        </section>
    );
});
