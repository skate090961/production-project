import { Article } from '@/entities/article';
import { rtkApi } from '@/shared/api/rtk-api';

const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRecommendationsList: build.query<Article[], number>({
            query: (limit) => ({
                url: 'articles/',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
});

export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery;
