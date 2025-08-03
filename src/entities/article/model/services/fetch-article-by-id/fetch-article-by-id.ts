import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';

import { Article } from '../../types/article';

export const fetchArticleById = createAsyncThunk<Article, string, ThunkConfig<string>>(
    'articleDetails/fetchArticleById',
    async (articleId, thunkAPI) => {
        const { extra, rejectWithValue } = thunkAPI;

        try {
            const response = await extra.api.get(`/articles/${articleId}`);

            if (!response.data) {
                throw new Error();
            }

            const { data } = response;

            return data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
