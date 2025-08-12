import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';
import { ArticleSortField } from '@/entities/article';
import { SortOrder } from '@/shared/types';

import { getArticlesInited } from '../../selectors/articles';
import { articlesActions } from '../../slices/articles-slice';
import { fetchArticles } from '../fetch-articles-list/fetch-articles-list';

export const initArticles = createAsyncThunk<void, URLSearchParams, ThunkConfig<string>>(
    'articles/initArticles',
    async (searchParams, thunkAPI) => {
        const {
            dispatch,
            getState,
        } = thunkAPI;
        const articlesInited = getArticlesInited(getState());

        if (!articlesInited) {
            const orderFromUrl = searchParams.get('order') as SortOrder;
            const sortFromUrl = searchParams.get('sort') as ArticleSortField;
            const searchFromUrl = searchParams.get('search');

            if (orderFromUrl) {
                dispatch(articlesActions.updateOrder(orderFromUrl));
            }

            if (sortFromUrl) {
                dispatch(articlesActions.updateSort(sortFromUrl));
            }

            if (searchFromUrl) {
                dispatch(articlesActions.updateSearch(searchFromUrl));
            }

            dispatch(articlesActions.initState());
            dispatch(fetchArticles({}));
        }
    },
);
