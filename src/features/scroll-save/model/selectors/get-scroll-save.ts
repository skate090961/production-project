import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/store-provider';

const getScrollSave = (state: StateSchema) => state.scrollSave.scroll;

export const getScrollSaveByPath = createSelector(
    getScrollSave,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
);
