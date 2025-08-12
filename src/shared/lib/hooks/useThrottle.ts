import { useCallback, useRef } from 'react';

export const useThrottle = <T>(
    cb: (...args: T[]) => void,
    delay: number = 500,
) => {
    const throttleRef = useRef(false);

    return useCallback((...args: T[]) => {
        if (!throttleRef.current) {
            cb(...args);
            throttleRef.current = true;

            setTimeout(() => {
                throttleRef.current = false;
            }, delay);
        }
    }, [cb, delay]);
};
