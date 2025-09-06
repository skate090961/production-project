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

    const acceptHandle = useCallback(() => {
        onToggleModal();
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, onToggleModal, starsCount]);

    const cancelHandle = useCallback(() => {
        onToggleModal();
        onCancel?.(starsCount);
    }, [onCancel, onToggleModal, starsCount]);

    const onChangeFeedback = useCallback((value: string) => {
        setFeedback(value);
    }, []);

    const titleMessage = starsCount ? t('Спасибо за оценку!') : title;

    const modalContent = (
        <VStack gap="32">
            <Text title={feedbackTitle} />
            <Input
                placeholder={t('Ваш отзыв')}
                onChange={onChangeFeedback}
            />
        </VStack>
    );

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
            {isMobile ? (
                <Drawer
                    isOpen={isModalOpen}
                    onClose={cancelHandle}
                >
                    {modalContent}
                    <Button
                        onClick={acceptHandle}
                        fullWidth
                    >
                        {t('Отправить')}
                    </Button>
                </Drawer>
            ) : (
                <Modal
                    isOpen={isModalOpen}
                    onClose={cancelHandle}
                    isLazy
                >
                    <VStack gap="16">
                        {modalContent}
                        <HStack justify="end" gap="8">
                            <Button
                                onClick={cancelHandle}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                onClick={acceptHandle}
                            >
                                {t('Отправить')}
                            </Button>
                        </HStack>
                    </VStack>
                </Modal>
            )}
        </Card>
    );
};
