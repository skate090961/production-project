import React, { memo, ReactNode } from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';
import { classNames, Mods } from '@/shared/lib/class-names/class-names';
import { useModal } from '@/shared/lib/hooks/useModal';

import { AppIcon } from '../app-icon/app-icon';
import { Button, ButtonTheme } from '../button/button';
import { Overlay } from '../overlay/overlay';
import { Portal } from '../portal/portal';
import { HStack } from '../stack';

import styles from './modal.module.scss';

interface ModalProps {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    isLazy?: boolean;
    children?: ReactNode;
}

export const Modal = memo((props: ModalProps) => {
    const {
        className,
        onClose,
        isOpen,
        children,
        isLazy,
    } = props;

    const {
        close,
        isClosing,
        isMounted,
        isVisible,
    } = useModal({
        isOpen,
        onClose,
        animationDelay: 200,
    });

    const mods: Mods = {
        [styles.opened]: isVisible,
        [styles.closed]: isClosing,
    };

    if (isLazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(styles.root, [className], mods)}>
                <Overlay onClick={close} />
                <div className={styles.modal}>
                    <HStack justify="end" className={styles.controls}>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            onClick={close}
                            aria-label="Закрыть модальное окно"
                        >
                            <AppIcon Svg={CloseIcon} />
                        </Button>
                    </HStack>
                    <div className={styles.content}>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
});
