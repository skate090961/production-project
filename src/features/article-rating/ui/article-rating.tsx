import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/rating';
import { getUserAuthData } from '@/entities/user';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';

import { useGetArticleRatingQuery, useRateArticleMutation } from '../api/article-rating-api';

export interface ArticleRatingProps {
    className?: string;
    articleId: string;
}

const ArticleRating = (props: ArticleRatingProps) => {
    const {
        className,
        articleId,
    } = props;

    const { t } = useTranslation('article');
    const userData = useSelector(getUserAuthData);

    const {
        data: articleRating,
        isLoading: articleRatingIsLoading,
    } = useGetArticleRatingQuery({
        articleId,
        userId: userData!.id,
    });

    const [
        rateArticleMutation,
    ] = useRateArticleMutation({

    });

    const handleRateArticle = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                articleId,
                feedback,
                userId: userData!.id,
                rate: starsCount,
            });
        } catch (e) {
            console.error(e);
        }
    }, [articleId, rateArticleMutation, userData]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateArticle(starsCount, feedback);
    }, [handleRateArticle]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateArticle(starsCount);
    }, [handleRateArticle]);

    if (articleRatingIsLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    const rating = articleRating?.[0];

    return (
        <RatingCard
            className={className}
            title={t('Как вам статья?')}
            feedbackTitle={t('Оставьте отзыв о статье')}
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
        />
    );
};

export default memo(ArticleRating);
