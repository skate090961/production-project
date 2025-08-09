import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';

import { getArticlesHasMore, getArticlesIsLoading, getArticlesPageNumber } from '../../selectors/articles';
import { articlesActions } from '../../slices/articles-slice';
import { fetchArticles } from '../fetch-articles-list/fetch-articles-list';

export const fetchArticlesNewPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'articles/fetchArticlesNewPage',
    async (_, thunkAPI) => {
        const {
            getState, dispatch,
        } = thunkAPI;
        const pageNumber = getArticlesPageNumber(getState());
        const isLoading = getArticlesIsLoading(getState());
        const hasMore = getArticlesHasMore(getState());

        if (hasMore && !isLoading) {
            const pageNumberInc = pageNumber + 1;
            dispatch(articlesActions.updatePage(pageNumberInc));
            dispatch(fetchArticles({ page: pageNumberInc }));
        }
    },
);
