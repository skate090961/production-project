import React, { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Country } from '@/entities/country';
import { Currency } from '@/entities/currency';
import {
    fetchProfileData,
    getProfileError,
    getProfileForm,
    getProfileIsLoading,
    getProfilerReadonly,
    profileActions,
    ProfileCard,
    profileReducer,
} from '@/entities/profile';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';

import { ProfilePageHeader } from './profile-page-header/profile-page-header';

const initReducers: ReducerList = {
    profile: profileReducer,
};

const Profile = () => {
    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfilerReadonly);

    useEffect(() => {
        dispatch(fetchProfileData());
    }, [dispatch]);

    const onChangeFirstname = useCallback((value: string) => {
        dispatch(profileActions.updateForm({ firstname: value || '' }));
    }, [dispatch]);

    const onChangeLastname = useCallback((value: string) => {
        dispatch(profileActions.updateForm({ lastname: value || '' }));
    }, [dispatch]);

    const onChangeCity = useCallback((value: string) => {
        dispatch(profileActions.updateForm({ city: value || '' }));
    }, [dispatch]);

    const onChangeAge = useCallback((value: string) => {
        if (value === '' || value === '0' || /^[1-9]\d*$/.test(value)) {
            dispatch(profileActions.updateForm({ age: Number(value) || 0 }));
        }
    }, [dispatch]);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(profileActions.updateForm({ username: value || '' }));
    }, [dispatch]);

    const onChangeAvatar = useCallback((value: string) => {
        dispatch(profileActions.updateForm({ avatar: value || '' }));
    }, [dispatch]);

    const onChangeCurrency = useCallback((currency: Currency) => {
        dispatch(profileActions.updateForm({ currency }));
    }, [dispatch]);

    const onChangeCountry = useCallback((country: Country) => {
        dispatch(profileActions.updateForm({ country }));
    }, [dispatch]);

    return (
        <DynamicModuleLoader
            reducers={initReducers}
            removeAfterUnmount
        >
            <ProfilePageHeader />
            <ProfileCard
                data={formData}
                isLoading={isLoading}
                error={error}
                readonly={readonly}
                onChangeFirstname={onChangeFirstname}
                onChangeLastname={onChangeLastname}
                onChangeCity={onChangeCity}
                onChangeAge={onChangeAge}
                onChangeUsername={onChangeUsername}
                onChangeAvatar={onChangeAvatar}
                onChangeCurrency={onChangeCurrency}
                onChangeCountry={onChangeCountry}
            />
        </DynamicModuleLoader>
    );
};

export default memo(Profile);
