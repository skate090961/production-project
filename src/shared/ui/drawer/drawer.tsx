import {
    memo, PropsWithChildren, useCallback, useEffect,
} from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';
import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components/animation-provider';

import { Overlay } from '../overlay/overlay';
import { Portal } from '../portal/portal';

import styles from './drawer.module.scss';

interface DrawerProps extends PropsWithChildren {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

const height = window.innerHeight - 100;

const DrawerContent = memo((props: DrawerProps) => {
    const { Spring, Gesture } = useAnimationLibs();

    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

    const {
        isOpen,
        onClose,
        className,
        children,
    } = props;

    const open = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            open();
        }
    }, [isOpen, open]);

    const close = useCallback((velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    }, [Spring.config.stiff, api, onClose]);

    const bind = Gesture.useDrag(
        ({
            last,
            velocity: [, vy],
            direction: [, dy],
            offset: [, oy],
            cancel,
        }) => {
            if (oy < -70) cancel();

            if (last) {
                if (oy > height * 0.5 || (vy > 0.5 && dy > 0)) {
                    close();
                } else {
                    open();
                }
            } else api.start({ y: oy, immediate: true });
        },
        {
            from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? 'block' : 'none'));

    return (
        <Portal>
            <div className={classNames(styles.root, [className])}>
                <Overlay onClick={close} />
                <Spring.a.div
                    className={styles.sheet}
                    style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
});

const DrawerLazy = (props: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => (
    <AnimationProvider>
        <DrawerLazy {...props} />
    </AnimationProvider>
);
