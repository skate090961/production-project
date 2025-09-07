import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '@/shared/ui/card/card';
import { VStack } from '@/shared/ui/stack';
import { StarRating } from '@/shared/ui/star-rating/star-rating';
import { Text } from '@/shared/ui/text/text';

import { Feedback } from '../feedback/feedback';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    onAccept?: (starsCount: number, feedback?: string) => void;
    onCancel?: (starsCount: number) => void;
    rate?: number;
}

export const RatingCard = (props: RatingCardProps) => {
    const {
        className,
        feedbackTitle,
        title,
        onAccept,
        onCancel,
        rate = 0,
    } = props;

    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rate);

    const hasFeedback = Boolean(feedbackTitle);

    const onToggleModal = useCallback(() => {
        setIsModalOpen((prev) => !prev);
    }, []);

    const onSelectStars = useCallback((selectedStarsCount: number) => {
        setStarsCount(selectedStarsCount);
        if (hasFeedback) {
            onToggleModal();
        } else {
            onAccept?.(selectedStarsCount);
        }
    }, [hasFeedback, onAccept, onToggleModal]);

    const titleMessage = starsCount ? t('Спасибо за оценку!') : title;

    return (
        <Card className={className}>
            <VStack align="center" gap="8">
                <Text title={titleMessage} />
                <StarRating
                    size={35}
                    onSelect={onSelectStars}
                    selectedStars={starsCount}
                />
            </VStack>
            <Feedback
                feedbackTitle={feedbackTitle}
                starsCount={starsCount}
                onCloseModal={onToggleModal}
                isModalOpen={isModalOpen}
                onCancel={onCancel}
                onAccept={onAccept}
            />
        </Card>
    );
};
