import { memo, useCallback, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useTranslation } from 'react-i18next';

import { Button } from '@/shared/ui/button';
import { Drawer } from '@/shared/ui/drawer';
import { Input } from '@/shared/ui/input';
import { Modal } from '@/shared/ui/modal';
import { HStack, VStack } from '@/shared/ui/stack';
import { Text } from '@/shared/ui/text';

interface FeedbackProps {
    className?: string;
    onAccept?: (starsCount: number, feedback?: string) => void;
    onCancel?: (starsCount: number) => void;
    onCloseModal?: () => void;
    isModalOpen?: boolean;
    feedbackTitle?: string;
    starsCount?: number;
}

export const Feedback = memo((props: FeedbackProps) => {
    const {
        className,
        isModalOpen,
        feedbackTitle,
        starsCount = 0,
        onAccept,
        onCancel,
        onCloseModal,
    } = props;
    const { t } = useTranslation();

    const [feedback, setFeedback] = useState('');

    const acceptHandle = useCallback(() => {
        onCloseModal?.();
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, onCloseModal, starsCount]);

    const cancelHandle = useCallback(() => {
        onCloseModal?.();
        onCancel?.(starsCount);
    }, [onCancel, onCloseModal, starsCount]);

    const onChangeFeedback = useCallback((value: string) => {
        setFeedback(value);
    }, []);

    const modalContent = (
        <VStack gap="32">
            <Text title={feedbackTitle} />
            <Input
                placeholder={t('Ваш отзыв')}
                onChange={onChangeFeedback}
            />
        </VStack>
    );

    if (isMobile) {
        return (
            <Drawer
                className={className}
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
        );
    }

    return (
        <Modal
            className={className}
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
    );
});
