import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';
import { Article, ArticleType } from '@/entities/article';
import { addQueryParams } from '@/shared/lib/url/add-query-params/add-query-params';

import {
    getArticlesLimit,
    getArticlesOrder,
    getArticlesPageNumber,
    getArticlesSearch,
    getArticlesSort,
    getArticlesType,
} from '../../selectors/articles';

export interface FetchArticlesArgs {
    replace?: boolean;
}

export const fetchArticles = createAsyncThunk<Article[], FetchArticlesArgs, ThunkConfig<string>>(
    'articles/fetchArticles',
    async (args, thunkAPI) => {
        const { extra, rejectWithValue, getState } = thunkAPI;

        const limit = getArticlesLimit(getState());
        const order = getArticlesOrder(getState());
        const sort = getArticlesSort(getState());
        const search = getArticlesSearch(getState());
        const page = getArticlesPageNumber(getState());
        const type = getArticlesType(getState());

        try {
            addQueryParams({
                sort,
                order,
                search,
                type,
            });

            const response = await extra.api.get('/articles', {
                params: {
                    _expand: 'user',
                    _page: page,
                    _limit: limit,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type: type === ArticleType.ALL ? undefined : type,
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
