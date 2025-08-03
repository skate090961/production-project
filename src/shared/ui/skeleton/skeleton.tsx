import { CSSProperties, memo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './skeleton.module.scss';

interface SkeletonProps {
    className?: string;
    height?: string | number;
    width?: string | number;
    radius?: string;
}

export const Skeleton = memo((props: SkeletonProps) => {
    const {
        className, height, width, radius,
    } = props;

    const inlineStyles: CSSProperties = {
        height,
        width,
        borderRadius: radius,
    };

    return (
        <div
            className={classNames(styles.root, [className])}
            style={inlineStyles}
        />
    );
});
