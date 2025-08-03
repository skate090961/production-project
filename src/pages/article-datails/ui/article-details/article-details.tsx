import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { ArticleDetailsUI } from '@/entities/article';

const ArticleDetails = () => {
    const { t } = useTranslation('article');
    const { id } = useParams<{id: string}>();

    if (!id) {
        return (
            <div>
                {t('Статья не найдена')}
            </div>
        );
    }

    return (
        <div>
            <ArticleDetailsUI id={id} />
        </div>
    );
};

export default memo(ArticleDetails);
