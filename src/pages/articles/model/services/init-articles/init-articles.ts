import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';

import { getArticlesInited } from '../../selectors/articles';
import { articlesActions } from '../../slices/articles-slice';
import { fetchArticles } from '../fetch-articles-list/fetch-articles-list';

export const initArticles = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articles/initArticles',
    async (_, thunkAPI) => {
        const {
            dispatch,
            getState,
        } = thunkAPI;
        const articlesInited = getArticlesInited(getState());

        if (!articlesInited) {
            dispatch(articlesActions.initState());
            dispatch(fetchArticles({ page: 1 }));
        }
    },
);
