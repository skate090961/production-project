import { lazy } from 'react';

export const ProfileLazy = lazy(() => new Promise((res) => {
    // @ts-ignore
    // fake delay for tests
    setTimeout(() => res(import('./profile')), 1500);
}));
