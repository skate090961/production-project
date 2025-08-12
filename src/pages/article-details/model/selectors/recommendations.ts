import { StateSchema } from '@/app/providers/store-provider';

export const getArticleRecommendationsError = (state: StateSchema) => state.articleDetailsRecommendations?.error;
export const getArticleRecommendationsIsLoading = (
    state: StateSchema,
) => state.articleDetailsRecommendations?.isLoading;
