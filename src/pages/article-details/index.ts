export type { ArticleDetailsCommentsSchema } from './model/types/article-details-comments-schema';
export type { ArticleDetailsRecommendationsSchema } from './model/types/article-details-recommendations-schema';

export { ArticleDetailsLazy as ArticleDetails } from './ui/article-details/article-details.lazy';
export { fetchArticleRecommendations } from
    './model/services/fetch-article-recommendations/fetch-article-recommendations';
