import { memo, PropsWithChildren } from 'react';

import { classNames, Mods } from '@/shared/lib/class-names/class-names';

import { Overlay } from '../overlay/overlay';
import { Portal } from '../portal/portal';

import styles from './drawer.module.scss';

interface DrawerProps extends PropsWithChildren {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export const Drawer = memo((props: DrawerProps) => {
    const {
        isOpen,
        onClose,
        className,
        children,
    } = props;

    const mods: Mods = {
        [styles.opened]: isOpen,
    };

    return (
        <Portal>
            <div className={classNames(styles.root, [className], { ...mods })}>
                <Overlay onClick={onClose} />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </Portal>
    );
});
