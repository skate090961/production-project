import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const Article = () => {
    const { t } = useTranslation('article');

    return (
        <div>
            {t('Articles Page')}
        </div>
    );
};

export default memo(Article);
