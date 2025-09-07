import React, { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { RatingCard } from '@/entities/rating';
import { getUserAuthData } from '@/entities/user';
import { Skeleton } from '@/shared/ui/skeleton/skeleton';

import { useGetProfileRatingQuery, useRateProfileMutation } from '../api/profile-rating-api';

export interface ProfileRatingProps {
    className?: string;
    profileId: string;
}

const ProfileRating = (props: ProfileRatingProps) => {
    const {
        className,
        profileId,
    } = props;

    const { t } = useTranslation('profile');
    const userData = useSelector(getUserAuthData);
    const canRate = userData!.id !== profileId;

    const {
        data: profileRating,
        isLoading: articleRatingIsLoading,
    } = useGetProfileRatingQuery({
        profileId,
        userId: userData!.id,
    }, { skip: !canRate });

    const [rateArticleMutation] = useRateProfileMutation();

    const handleRateProfile = useCallback((starsCount: number, feedback?: string) => {
        try {
            rateArticleMutation({
                profileId,
                feedback,
                userId: userData!.id,
                rate: starsCount,
            });
        } catch (e) {
            console.error(e);
        }
    }, [profileId, rateArticleMutation, userData]);

    const onAccept = useCallback((starsCount: number, feedback?: string) => {
        handleRateProfile(starsCount, feedback);
    }, [handleRateProfile]);

    const onCancel = useCallback((starsCount: number) => {
        handleRateProfile(starsCount);
    }, [handleRateProfile]);

    if (!canRate) {
        return null;
    }

    if (articleRatingIsLoading) {
        return <Skeleton width="100%" height={120} />;
    }

    const rating = profileRating?.[0];

    return (
        <RatingCard
            className={className}
            title={t('Как вам профиль?')}
            feedbackTitle={t('Оставьте отзыв о профиле')}
            onAccept={onAccept}
            onCancel={onCancel}
            rate={rating?.rate}
        />
    );
};

export default memo(ProfileRating);
