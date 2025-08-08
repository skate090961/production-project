import { FC, lazy } from 'react';

import { AddNewCommentProps } from './add-new-comment';

export const AddNewCommentLazy = lazy<FC<AddNewCommentProps>>(() => new Promise((res) => {
    // @ts-ignore
    // fake delay for tests
    setTimeout(() => res(import('./add-new-comment')), 1500);
}));
