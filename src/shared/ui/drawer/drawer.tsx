import { memo, PropsWithChildren } from 'react';

import { classNames, Mods } from '@/shared/lib/class-names/class-names';
import { useModal } from '@/shared/lib/hooks/useModal';

import { Overlay } from '../overlay/overlay';
import { Portal } from '../portal/portal';

import styles from './drawer.module.scss';

interface DrawerProps extends PropsWithChildren {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    isLazy?: boolean
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        isOpen,
        onClose,
        className,
        children,
        isLazy,
    } = props;

    const {
        close,
        isVisible,
        isClosing,
        isMounted,
    } = useModal({
        isOpen,
        onClose,
        animationDelay: 150,
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
            <div className={classNames(styles.root, [className], { ...mods })}>
                <Overlay onClick={close} />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});
