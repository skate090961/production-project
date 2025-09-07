import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetailsUI } from '@/entities/article';
import { ArticleRating } from '@/features/article-rating';
import { ArticleRecommendationsList } from '@/features/article-recommendations-list';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { VStack } from '@/shared/ui/stack';
import { Page } from '@/widgets/page';

import { articleDetailsCommentsReducer } from '../../model/slices/article-details-comments-slice';
import { ArticleDetailsComments } from '../article-details-comments/article-details-comments';
import { ArticleDetailsHeader } from '../article-details-header/article-details-header';

const initReducers: ReducerList = {
    articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetails = () => {
    const { t } = useTranslation('article');
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return (
            <Page>
                {t('Статья не найдена')}
            </Page>
        );
    }

    return (
        <DynamicModuleLoader
            reducers={initReducers}
            removeAfterUnmount
        >
            <Page>
                <VStack gap="16">
                    <ArticleDetailsHeader id={id} />
                    <ArticleDetailsUI id={id} />
                    <ArticleRating articleId={id} />
                    <ArticleRecommendationsList />
                    <ArticleDetailsComments id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default memo(ArticleDetails);
