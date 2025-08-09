import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/store-provider';
import { Article, ArticleView } from '@/entities/article';
import { ARTICLES_VIEW_LS_KEY } from '@/shared/consts/local-storage';

import { fetchArticles } from '../services/fetch-articles-list/fetch-articles-list';
import { ArticlesSchema } from '../types/articles-schema';

const articlesAdapter = createEntityAdapter<Article>({
    selectId: (article) => article.id,
});

export const getArticles = articlesAdapter.getSelectors<StateSchema>(
    (state) => state.articles || articlesAdapter.getInitialState(),
);

const articlesSlice = createSlice({
    name: 'articlesSlice',
    initialState: articlesAdapter.getInitialState<ArticlesSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: ArticleView.LIST,
        hasMore: true,
        page: 1,
        _inited: false,
    }),
    reducers: {
        updateView: (state, action: PayloadAction<ArticleView>) => {
            state.view = action.payload;
            localStorage.setItem(ARTICLES_VIEW_LS_KEY, action.payload);
        },
        updatePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LS_KEY) as ArticleView;
            state.view = view;
            state.limit = view === ArticleView.GRID ? 12 : 6;
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticles.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
                state.isLoading = false;
                articlesAdapter.addMany(state, action.payload);
                state.hasMore = action.payload.length > 0;
            })
            .addCase(fetchArticles.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { reducer: articlesReducer } = articlesSlice;
export const { actions: articlesActions } = articlesSlice;
