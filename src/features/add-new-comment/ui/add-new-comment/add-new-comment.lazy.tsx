import { FC, lazy } from 'react';

import { AddNewCommentProps } from './add-new-comment';

export const AddNewCommentLazy = lazy<FC<AddNewCommentProps>>(() => import('./add-new-comment'));
