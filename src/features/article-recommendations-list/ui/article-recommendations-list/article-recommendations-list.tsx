import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList } from '@/entities/article';
import {
    fetchArticleRecommendations,
} from '@/pages/article-details/model/services/fetch-article-recommendations/fetch-article-recommendations';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { VStack } from '@/shared/ui/stack';
import { Text, TextSize } from '@/shared/ui/text/text';

import { useArticleRecommendationsList } from '../../api/ArticleRecommendationsApi';

import styles from './article-recommendations-list.module.scss';

interface ArticleRecommendationsListProps {
    className?: string;
}

const LIMIT_OF_ARTICLES = 8;

export const ArticleRecommendationsList = memo(({ className }: ArticleRecommendationsListProps) => {
    const { t } = useTranslation('article');
    const dispatch = useAppDispatch();
    const { data: articles, isLoading } = useArticleRecommendationsList(LIMIT_OF_ARTICLES);

    useEffect(() => {
        dispatch(fetchArticleRecommendations());
    }, [dispatch]);

    return (
        <VStack gap="8" className={className}>
            <Text
                size={TextSize.L}
                title={t('Рекомендуем')}
            />
            <ArticleList
                articles={articles}
                isLoading={isLoading}
                className={styles.recommendations}
                target="_blank"
            />
        </VStack>
    );
});
