import { CSSProperties, useMemo } from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = (props: AvatarProps) => {
    const {
        className,
        src,
        size = 100,
        alt = 'Аватар',
    } = props;

    const inlineStyles: CSSProperties = useMemo(() => ({
        width: size,
        height: size,
    }), [size]);

    return (
        <img
            src={src}
            style={inlineStyles}
            alt={alt}
            className={classNames(styles.root, [className])}
        />
    );
};
