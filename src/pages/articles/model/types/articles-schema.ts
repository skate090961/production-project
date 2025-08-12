import { EntityState } from '@reduxjs/toolkit';

import {
    Article,
    ArticleSortField, ArticleType,
    ArticleView,
} from '@/entities/article';

export interface ArticlesSchema extends EntityState<Article> {
    isLoading?: boolean;
    error?: string;

    // pagination
    page: number;
    limit?: number;
    hasMore: boolean;

    // filters
    view: ArticleView;
    order: 'asc' | 'desc';
    sort: ArticleSortField;
    search: string;
    type: ArticleType,

    _inited: boolean;
}
