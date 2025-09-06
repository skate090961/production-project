import { Rating } from '@/entities/rating';
import { rtkApi } from '@/shared/api/rtk-api';

interface GerArticleRatingArg {
    userId: string;
    articleId: string;
}

interface RateArticleArg extends GerArticleRatingArg {
    rate: number;
    feedback?: string;
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getArticleRating: build.query<Rating[], GerArticleRatingArg>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                params: {
                    userId,
                    articleId,
                },
            }),
        }),
        rateArticle: build.mutation<void, RateArticleArg>({
            query: (arg) => ({
                method: 'POST',
                url: '/article-ratings',
                body: arg,
            }),
        }),
    }),
});

export const {
    useGetArticleRatingQuery,
    useRateArticleMutation,
} = articleRatingApi;
