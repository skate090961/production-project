import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import { ArticleDetailsUI, getArticleDetailsError } from '@/entities/article';
import { CommentList } from '@/entities/comment';
import { AddNewComment } from '@/features/add-new-comment';
import { RoutePath } from '@/shared/config/route/route-config';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Page } from '@/shared/ui/page/page';
import { Text } from '@/shared/ui/text/text';

import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import { addNewCommentForArticle } from '../../model/services/add-new-comment-for-article/add-new-comment-for-article';
// eslint-disable-next-line max-len
import { fetchCommentsByArticleId } from '../../model/services/fetch-comments-by-article-id/fetch-comments-by-article-id';
import { articleDetailsCommentsReducer, getArticleComment } from '../../model/slices/article-details-comments-slice';

import styles from './article-details.module.scss';

const initReducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetails = () => {
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const comments = useSelector(getArticleComment.selectAll);
    const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const articleError = useSelector(getArticleDetailsError);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(String(id)));
    }, [dispatch, id]);

    const onSendComment = useCallback((text: string) => {
        dispatch(addNewCommentForArticle(text));
    }, [dispatch]);

    const onBackToList = useCallback(() => {
        navigate(RoutePath.articles);
    }, [navigate]);

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
            <Page>
                <Button
                    theme={ButtonTheme.OUTLINE}
                    onClick={onBackToList}
                >
                    {t('Назад к списку')}
                </Button>
                <ArticleDetailsUI id={id} />
                {!articleError && (
                    <div className={styles.comments}>
                        <Text title={t('Комментарии')} />
                        <AddNewComment onSendComment={onSendComment} />
                        <CommentList
                            isLoading={commentsIsLoading}
                            comments={comments}
                        />
                    </div>
                )}
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetails);
