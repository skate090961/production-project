import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { ArticleList, ArticleView } from '@/entities/article';

const Article = () => {
    const { t } = useTranslation('article');

    return (
        <div>
            <ArticleList
                articles={[]}
                view={ArticleView.LIST}
            />
        </div>
    );
};

export default memo(Article);
