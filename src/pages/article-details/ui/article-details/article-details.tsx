import React, { memo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

import {
    ArticleDetailsUI, ArticleList, ArticleView, getArticleDetailsError,
} from '@/entities/article';
import { CommentList } from '@/entities/comment';
import { AddNewComment } from '@/features/add-new-comment';
import { RoutePath } from '@/shared/config/route/route-config';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Text, TextSize } from '@/shared/ui/text/text';
import { Page } from '@/widgets/page/page';

import { getArticleDetailsCommentsIsLoading } from '../../model/selectors/comments';
import { getArticleRecommendationsIsLoading } from '../../model/selectors/recommendations';
import { addNewCommentForArticle } from '../../model/services/add-new-comment-for-article/add-new-comment-for-article';
import { fetchArticleRecommendations } from
    '../../model/services/fetch-article-recommendations/fetch-article-recommendations';
import { fetchCommentsByArticleId } from
    '../../model/services/fetch-comments-by-article-id/fetch-comments-by-article-id';
import { articleDetailsCommentsReducer, getArticleComment } from '../../model/slices/article-details-comments-slice';
import {
    articleDetailsRecommendationsReducer,
    getArticleRecommendations,
} from '../../model/slices/article-details-recommendations-slice';

import styles from './article-details.module.scss';

const initReducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentsReducer,
    articleDetailsRecommendations: articleDetailsRecommendationsReducer,
};

const ArticleDetails = () => {
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const comments = useSelector(getArticleComment.selectAll);
    const recommendations = useSelector(getArticleRecommendations.selectAll);
    const commentsIsLoading = useSelector(getArticleDetailsCommentsIsLoading);
    const recommendationsIsLoading = useSelector(getArticleRecommendationsIsLoading);
    const articleError = useSelector(getArticleDetailsError);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchCommentsByArticleId(String(id)));
        dispatch(fetchArticleRecommendations());
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
                <div className={styles.recommendationsWrapper}>
                    <Text size={TextSize.L} title={t('Рекомендуем')} />
                    <ArticleList
                        articles={recommendations}
                        isLoading={recommendationsIsLoading}
                        className={styles.recommendations}
                        target="_blank"
                    />
                </div>
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
