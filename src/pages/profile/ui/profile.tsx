import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { profileReducer } from '@/entities/profile';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';

const initReducers: ReducerList = {
    profile: profileReducer,
};

const Profile = () => {
    const { t } = useTranslation('profile');

    return (
        <DynamicModuleLoader
            reducers={initReducers}
            removeAfterUnmount
        >
            <div>
                {t('Профиль')}
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(Profile);
