import React, { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ProfileCard, profileReducer } from '@/entities/profile';
import { fetchProfileData } from '@/entities/profile/model/services/fetch-profile-data/fetch-profile-data';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

const initReducers: ReducerList = {
    profile: profileReducer,
};

const Profile = () => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={initReducers}
            removeAfterUnmount
        >
            <div>
                <ProfileCard />
            </div>
        </DynamicModuleLoader>
    );
};

export default memo(Profile);
