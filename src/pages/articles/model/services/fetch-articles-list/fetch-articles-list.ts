import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';
import { Article } from '@/entities/article';

import { getArticlesLimit } from '../../selectors/articles';

interface FetchArticlesArgs {
    page: number;
}

export const fetchArticles = createAsyncThunk<Article[], FetchArticlesArgs, ThunkConfig<string>>(
    'articles/fetchArticles',
    async (args, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;
        const { page = 1 } = args;
        const limit = getArticlesLimit(getState());
        try {
            const response = await extra.api.get('/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
                },
            });

            if (!response.data) {
                throw new Error();
            }

            const { data } = response;

            return data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
