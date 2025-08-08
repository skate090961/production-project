import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/store-provider';
import { getArticleDetailsData } from '@/entities/article';
import { Comment } from '@/entities/comment';
import { getUserAuthData } from '@/entities/user';

import { fetchCommentsByArticleId } from '../fetch-comments-by-article-id/fetch-comments-by-article-id';

export const addNewCommentForArticle = createAsyncThunk<Comment, string, ThunkConfig<string>>(
    'articleDetails/addNewCommentForArticle',
    async (text, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            dispatch,
            getState,
        } = thunkAPI;

        try {
            const userData = getUserAuthData(getState());
            const article = getArticleDetailsData(getState());

            if (!userData || !text || !article) {
                return rejectWithValue('no data');
            }

            const response = await extra.api.post('/comments', {
                articleId: article?.id,
                userId: userData?.id,
                text,
            });

            if (!response.data) {
                throw new Error();
            }

            dispatch(fetchCommentsByArticleId(article.id));

            const { data } = response;

            return data;
        } catch (e) {
            return rejectWithValue('error');
        }
    },
);
