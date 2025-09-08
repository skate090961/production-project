import {
    ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    fallback?: ReactElement;
    errorFallback?: ReactElement;
}

enum ImageLoadingState {
    LOADING,
    LOADED,
    ERROR
}

export const AppImage = memo((props: AppImageProps) => {
    const {
        src,
        alt = 'image',
        fallback,
        errorFallback,
        ...otherProps
    } = props;

    const [loading, setLoading] = useState(ImageLoadingState.LOADING);

    useLayoutEffect(() => {
        const img = new Image();
        img.src = src ?? '';
        img.onload = () => setLoading(ImageLoadingState.LOADED);
        img.onerror = () => setLoading(ImageLoadingState.ERROR);
    }, [src]);

    if (loading === ImageLoadingState.LOADING && fallback) {
        return fallback;
    }

    if (loading === ImageLoadingState.ERROR && errorFallback) {
        return errorFallback;
    }

    return (
        <img
            src={src}
            alt={alt}
            {...otherProps}
        />
    );
});
