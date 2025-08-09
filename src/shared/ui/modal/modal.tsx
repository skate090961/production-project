import React, {
    FC, useCallback, useEffect, useRef, useState,
} from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';
import { classNames, Mods } from '@/shared/lib/class-names/class-names';
import { AppIcon } from '@/shared/ui/app-icon/app-icon';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Portal } from '@/shared/ui/portal/portal';

import styles from './modal.module.scss';

interface ModalProps {
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
    isLazy?: boolean;
}

const ANIMATION_DELAY = 200;

export const Modal: FC<ModalProps> = ({
    className,
    onClose,
    isOpen,
    children,
    isLazy,
}) => {
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            closeHandler();
        }
    }, [closeHandler]);

    const onModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }

        return () => setIsMounted(false);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.body.addEventListener('keydown', onKeyDown);
        }

        return () => document.body.removeEventListener('keydown', onKeyDown);
    }, [isOpen, onKeyDown]);

    useEffect(() => {
        if (isClosing) {
            timerRef.current = setTimeout(() => {
                if (onClose) {
                    onClose();
                }
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isClosing, onClose]);

    const mods: Mods = {
        [styles.opened]: isOpen,
        [styles.closed]: isClosing,
    };

    if (isLazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(styles.root, [className], mods)}>
                <div className={styles.overlay} onClick={closeHandler}>
                    <div className={styles.modal} onClick={onModalClick}>
                        <div className={styles.controls}>
                            <Button
                                theme={ButtonTheme.CLEAR}
                                onClick={closeHandler}
                                aria-label="Закрыть модальное окно"
                            >
                                <AppIcon Svg={CloseIcon} />
                            </Button>
                        </div>
                        <div className={styles.content}>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </Portal>
    );
};
