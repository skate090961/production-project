import { useCallback, useRef } from 'react';

export const useThrottle = (
    cb: (...args: any[]) => void,
    delay: number = 500,
) => {
    const throttleRef = useRef(false);

    return useCallback((...args: any[]) => {
        if (!throttleRef.current) {
            cb(...args);
            throttleRef.current = true;

            setTimeout(() => {
                throttleRef.current = false;
            }, delay);
        }
    }, [cb, delay]);
};
