import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getArticleDetailsError } from '@/entities/article';
import { CommentList } from '@/entities/comment';
import { AddNewComment } from '@/features/add-new-comment';
import { classNames } from '@/shared/lib/class-names/class-names';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { VStack } from '@/shared/ui/stack';
import { Text } from '@/shared/ui/text';

import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import { addNewCommentForArticle } from '../../model/services/add-new-comment-for-article/add-new-comment-for-article';
import { fetchCommentsByArticleId } from
    '../../model/services/fetch-comments-by-article-id/fetch-comments-by-article-id';
import { getArticleComment } from '../../model/slices/article-details-comments-slice';

interface ArticleDetailsCommentsProps {
    className?: string;
    id: string;
}

export const ArticleDetailsComments = ({ className, id }: ArticleDetailsCommentsProps) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(String(id)));
    }, [dispatch, id]);

    const articleError = useSelector(getArticleDetailsError);
    const comments = useSelector(getArticleComment.selectAll);
    const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const onSendComment = useCallback((text: string) => {
        dispatch(addNewCommentForArticle(text));
    }, [dispatch]);

    if (articleError) return null;

    return (
        <VStack className={classNames('', [className])} gap="8">
            <Text title={t('Комментарии')} />
            <AddNewComment onSendComment={onSendComment} />
            <CommentList
                isLoading={commentsIsLoading}
                comments={comments}
            />
        </VStack>
    );
};
