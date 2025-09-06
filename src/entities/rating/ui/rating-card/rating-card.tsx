import { useCallback, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/button/button';
import { Card } from '@/shared/ui/card/card';
import { Drawer } from '@/shared/ui/drawer/drawer';
import { Input } from '@/shared/ui/input/input';
import { Modal } from '@/shared/ui/modal/modal';
import { HStack, VStack } from '@/shared/ui/stack';
import { StarRating } from '@/shared/ui/star-rating/star-rating';
import { Text } from '@/shared/ui/text/text';

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    onAccept?: (starsCount: number, feedback?: string) => void;
    isLoading?: boolean;
}

export const RatingCard = (props: RatingCardProps) => {
    const {
        className,
        feedbackTitle,
        title,
        onAccept,
        isLoading,
    } = props;

    const { t } = useTranslation();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(0);
    const [feedback, setFeedback] = useState('');

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

    const handleAccept = useCallback(() => {
        onToggleModal();
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, onToggleModal, starsCount]);

    const onChangeFeedback = useCallback((value: string) => {
        setFeedback(value);
    }, []);

    const modalContent = (
        <VStack gap="32">
            <Text title={feedbackTitle} />
            <Input
                placeholder={t('Ваш отзыв')}
                onChange={onChangeFeedback}
                disabled={isLoading}
            />
        </VStack>
    );

    return (
        <Card className={className}>
            <VStack align="center" gap="8">
                <Text title={title} />
                <StarRating
                    size={35}
                    onSelect={onSelectStars}
                />
            </VStack>
            {isMobile ? (
                <Drawer
                    isOpen={isModalOpen}
                    onClose={onToggleModal}
                >
                    {modalContent}
                    <Button
                        onClick={handleAccept}
                        disabled={isLoading}
                        fullWidth
                    >
                        {t('Отправить')}
                    </Button>
                </Drawer>
            ) : (
                <Modal
                    isOpen={isModalOpen}
                    onClose={onToggleModal}
                    isLazy
                >
                    {modalContent}
                    <HStack justify="end">
                        <Button
                            onClick={handleAccept}
                            disabled={isLoading}
                        >
                            {t('Отправить')}
                        </Button>
                    </HStack>
                </Modal>
            )}
        </Card>
    );
};
