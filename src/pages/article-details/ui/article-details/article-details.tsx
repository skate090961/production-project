import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ArticleDetailsUI } from '@/entities/article';
import { CommentList } from '@/entities/comment';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { Text } from '@/shared/ui/text/text';

import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import { fetchCommentsByArticleId } from
    '../../model/services/fetch-comments-by-article-id/fetch-comments-by-article-id';
import { articleDetailsCommentsReducer, getArticleComment } from '../../model/slices/article-details-comments-slice';

import styles from './article-details.module.scss';

const initReducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetails = () => {
    const { t } = useTranslation('article');
    const { id } = useParams<{id: string}>();
    const dispatch = useDispatch();
    const comments = useSelector(getArticleComment.selectAll);
    const isLoading = useSelector(getArticleDetailsCommentsIsLoading);

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(String(id)));
    }, [dispatch, id]);

    if (!id) {
        return (
            <div>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <DynamicModuleLoader
            reducers={initReducers}
            removeAfterUnmount
        >
            <div>
                <ArticleDetailsUI id={id} />
                <Text title={t('Комментарии')} className={styles.commentTitle} />
                <CommentList
                    isLoading={isLoading}
                    comments={comments}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetails);
