import React, {
    memo, ReactNode, useCallback, useEffect, useRef, useState,
} from 'react';

import CloseIcon from '@/shared/assets/icons/close.svg';
import { classNames, Mods } from '@/shared/lib/class-names/class-names';

import { AppIcon } from '../app-icon/app-icon';
import { Button, ButtonTheme } from '../button/button';
import { Overlay } from '../overlay/overlay';
import { Portal } from '../portal/portal';
import { HStack } from '../stack';

import styles from './modal.module.scss';

interface ModalProps {
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
    isLazy?: boolean;
    children?: ReactNode;
}

const ANIMATION_DELAY = 200;

export const Modal = memo((props: ModalProps) => {
    const {
        className,
        onClose,
        isOpen,
        children,
        isLazy,
    } = props;
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

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

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            timerRef.current = setTimeout(() => setIsVisible(true), ANIMATION_DELAY);
        } else {
            setIsVisible(false);
            setIsMounted(false);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
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
        [styles.opened]: isVisible,
        [styles.closed]: isClosing,
    };

    if (isLazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div className={classNames(styles.root, [className], mods)}>
                <Overlay onClick={closeHandler} />
                <div className={styles.modal}>
                    <HStack justify="end" className={styles.controls}>
                        <Button
                            theme={ButtonTheme.CLEAR}
                            onClick={closeHandler}
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
