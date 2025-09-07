export type { ArticleDetailsSchema } from './model/types/article-details-schema';
export type { Article } from './model/types/article';

export { ArticleDetailsUI } from '@/entities/article/ui/article-details-ui/article-details-ui';
export { getArticleDetailsData } from './model/selectors/article-details';
export { getArticleDetailsError } from './model/selectors/article-details';
export { ArticleTypeTabs } from './ui/article-type-tabs/ui/article-type-tabs';
export { getArticleDetailsIsLoading } from './model/selectors/article-details';
export { ArticleList } from './ui/article-list/article-list';
export {
    ArticleView,
    ArticleSortField,
    ArticleType,
} from './model/types/article';
export { ArticleSortSelector } from './ui/article-sort-selector/article-sort-selector';
