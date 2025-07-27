import { lazy } from 'react';

export const ArticlesLazy = lazy(() => new Promise((res) => {
    // @ts-ignore
    // fake delay for tests
    setTimeout(() => res(import('./articles')), 1500);
}));
