import { useCallback, useRef } from 'react';

export const useDebounce = <T>(cb: (...args: T[]) => void, delay: number = 500) => {
    const timer = useRef<ReturnType<typeof setTimeout>>();

    return useCallback((...args: T[]) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => cb(...args), delay);
    }, [cb, delay]);
};
