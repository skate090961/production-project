import { createSelector } from '@reduxjs/toolkit';

import { getArticleDetailsData } from '@/entities/article';
import { getUserAuthData } from '@/entities/user';

export const getCanEditArticle = createSelector(
    getUserAuthData,
    getArticleDetailsData,
    (user, article) => {
        if (!article || !user) {
            return false;
        }

        return user.id === article.userId;
    },
);
