import { lazy } from 'react';

export const ArticleEditLazy = lazy(() => new Promise((res) => {
    // @ts-ignore
    // fake delay for tests
    setTimeout(() => res(import('./article-edit')), 400);
}));
