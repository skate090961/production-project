import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { RatingCard } from '@/entities/rating';
import { Page } from '@/widgets/page/page';

const Main = () => {
    const { t } = useTranslation('main');

    return (
        <Page>
            {t('Главная страница')}
            <RatingCard
                title={t('Как вам статья?')}
                feedbackTitle={t('Оставьте отзыв о статье')}
            />
        </Page>
    );
};

export default memo(Main);
