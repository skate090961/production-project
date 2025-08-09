import { lazy } from 'react';

export const ArticleDetailsLazy = lazy(() => new Promise((res) => {
    // @ts-ignore
    // fake delay for tests
    setTimeout(() => res(import('./article-details')), 400);
}));
