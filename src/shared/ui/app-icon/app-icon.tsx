import React, {
    FunctionComponent,
    memo,
    SVGAttributes,
    SVGProps,
} from 'react';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './icon.module.scss';

export enum IconTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    INVERTED_PRIMARY = 'invertedPrimary'
}

interface IconProps extends SVGProps<SVGSVGElement> {
    className?: string;
    Svg: FunctionComponent<SVGAttributes<SVGElement>>;
    theme?: IconTheme;
    width?: number;
    height?: number;
}

export const AppIcon = memo((props: IconProps) => {
    const {
        className,
        Svg,
        theme = IconTheme.PRIMARY,
        width = 24,
        height = 24,
        ...otherProps
    } = props;

    return (
        <Svg
            width={width}
            height={height}
            className={classNames('', [className, styles[theme]])}
            {...otherProps}
        />
    );
});
