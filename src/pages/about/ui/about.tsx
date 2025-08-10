import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/page/page';

const About = () => {
    const { t } = useTranslation('about');

    return (
        <Page>
            {t('О сайте')}
        </Page>
    );
};

export default memo(About);
