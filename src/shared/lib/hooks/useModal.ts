import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

interface UseModalProps {
    onClose?: () => void;
    isOpen?: boolean;
    animationDelay?: number;
}

interface UseModalResult {
    isClosing: boolean;
    isMounted: boolean;
    isVisible: boolean;
    close: () => void;
}

export const useModal = (props: UseModalProps): UseModalResult => {
    const {
        onClose,
        isOpen,
        animationDelay,
    } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const close = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
        }
    }, [onClose]);

    const onKeyDown = useCallback((e: KeyboardEvent) => {
        if (e.key === 'Escape') {
            close();
        }
    }, [close]);

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
            timerRef.current = setTimeout(() => setIsVisible(true), animationDelay);
        } else {
            setIsVisible(false);
            setIsMounted(false);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [animationDelay, isOpen]);

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
            }, animationDelay);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [animationDelay, isClosing, onClose]);

    return {
        close,
        isClosing,
        isMounted,
        isVisible,
    };
};
