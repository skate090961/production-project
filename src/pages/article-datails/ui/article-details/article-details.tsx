import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const ArticleDetails = () => {
    const { t } = useTranslation('article');

    return (
        <div>
            {t('Article Details Page')}
        </div>
    );
};

export default memo(ArticleDetails);
