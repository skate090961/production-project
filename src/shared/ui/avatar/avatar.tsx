import { CSSProperties, memo, useMemo } from 'react';

import AvatarIcon from '@/shared/assets/images/avatar.png';
import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './avatar.module.scss';

interface AvatarProps {
    className?: string;
    src?: string;
    size?: number;
    alt?: string;
}

export const Avatar = memo((props: AvatarProps) => {
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
            src={src || AvatarIcon}
            style={inlineStyles}
            alt={alt}
            className={classNames(styles.root, [className])}
        />
    );
});
