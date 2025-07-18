import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

const Main = () => {
    const { t } = useTranslation('main');

    return (
        <div>
            {t('Главная страница')}
        </div>
    );
};

export default memo(Main);
