import {
    memo, MutableRefObject, ReactNode, UIEvent, useEffect, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/store-provider';
import { getScrollSaveByPath, scrollSaveActions } from '@/features/scroll-save';
import { classNames } from '@/shared/lib/class-names/class-names';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { useInfiniteScroll } from '@/shared/lib/hooks/useInfiniteScroll';
import { useThrottle } from '@/shared/lib/hooks/useThrottle';

import styles from './page.module.scss';

interface PageProps {
    className?: string;
    children?: ReactNode;
    onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
    const { className, children, onScrollEnd } = props;

    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector(
        (state: StateSchema) => getScrollSaveByPath(state, pathname),
    );

    useInfiniteScroll({
        triggerRef,
        wrapperRef,
        cb: onScrollEnd,
    });

    useEffect(() => {
        wrapperRef.current.scrollTop = scrollPosition;
    }, [scrollPosition]);

    const onScroll = useThrottle((e: UIEvent<HTMLElement>) => {
        dispatch(scrollSaveActions.updateScrollPosition({
            path: pathname,
            position: e.currentTarget.scrollTop,
        }));
    });

    return (
        <main
            className={classNames(styles.root, [className])}
            ref={wrapperRef}
            onScroll={onScroll}
        >
            {children}
            {onScrollEnd ? (
                <div
                    className={styles.trigger}
                    ref={triggerRef}
                />
            ) : null}
        </main>
    );
});
