import React, { memo } from 'react';
import { useSelector } from 'react-redux';

import { ArticleList } from '@/entities/article';

import { getArticlesIsLoading, getArticlesView } from '../../model/selectors/articles';
import { getArticles } from '../../model/slices/articles-slice';

interface ArticlesInfiniteProps {
    className?: string;
}

export const ArticlesInfiniteList = memo(({ className }: ArticlesInfiniteProps) => {
    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);

    return (
        <ArticleList
            isLoading={isLoading}
            articles={articles}
            view={view}
            className={className}
        />
    );
});
