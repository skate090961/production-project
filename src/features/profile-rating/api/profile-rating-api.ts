import { Rating } from '@/entities/rating';
import { rtkApi } from '@/shared/api/rtk-api';

interface GerProfileRatingArg {
    userId: string;
    profileId: string;
}

interface RateProfileArg extends GerProfileRatingArg {
    rate: number;
    feedback?: string;
}

const profileRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getProfileRating: build.query<Rating[], GerProfileRatingArg>({
            query: ({ profileId, userId }) => ({
                url: '/profile-ratings',
                params: {
                    userId,
                    profileId,
                },
            }),
        }),
        rateProfile: build.mutation<void, RateProfileArg>({
            query: (arg) => ({
                method: 'POST',
                url: '/profile-ratings',
                body: arg,
            }),
        }),
    }),
});

export const {
    useGetProfileRatingQuery,
    useRateProfileMutation,
} = profileRatingApi;
