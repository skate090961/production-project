import { lazy } from 'react';

export const MainLazy = lazy(() => new Promise((res) => {
    // @ts-ignore
    // fake delay for tests
    setTimeout(() => res(import('./main')), 1500);
}));
