import { CSSProperties, memo, useMemo } from 'react';

import UserFilledIcon from '@/shared/assets/icons/user-filled.svg';
import { classNames } from '@/shared/lib/class-names/class-names';

import { AppIcon, IconTheme } from '../app-icon';
import { AppImage } from '../app-image';
import { Skeleton } from '../skeleton';

import styles from './avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
    fallbackInverted?: boolean;
}

export const Avatar = memo((props: AvatarProps) => {
    const {
        className,
        src,
        size = 100,
        alt = 'Аватар',
        fallbackInverted,
    } = props;

    const inlineStyles: CSSProperties = useMemo(() => ({
        width: size,
        height: size,
    }), [size]);

    const fallback = (
        <Skeleton
            width={size}
            height={size}
            className={styles.root}
        />
    );

    const errorFallback = (
        <AppIcon
            width={size}
            height={size}
            Svg={UserFilledIcon}
            theme={fallbackInverted ? IconTheme.PRIMARY : IconTheme.INVERTED_PRIMARY}
        />
    );

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            style={inlineStyles}
            alt={alt}
            className={classNames(styles.root, [className])}
        />
    );
});
