import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { ArticleList, ArticleView } from '@/entities/article';
import { ArticlesViewSelector } from '@/features/articles-view-selector';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import { getArticlesIsLoading, getArticlesView } from '../../model/selectors/articles';
import { fetchArticles } from '../../model/services/fetch-articles-list/fetch-articles-list';
import { articlesActions, articlesReducer, getArticles } from '../../model/slices/articles-slice';

const initReducers: ReducerList = {
    articles: articlesReducer,
};

const Article = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchArticles());
        dispatch(articlesActions.initState());
    }, [dispatch]);

    const articles = useSelector(getArticles.selectAll);
    const isLoading = useSelector(getArticlesIsLoading);
    const view = useSelector(getArticlesView);

    const onChangeView = useCallback((view: ArticleView) => {
        dispatch(articlesActions.updateView(view));
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={initReducers}>
            <div>
                <ArticlesViewSelector
                    view={view}
                    onViewClick={onChangeView}
                />
                <ArticleList
                    isLoading={isLoading}
                    articles={articles}
                    view={view}
                />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(Article);
