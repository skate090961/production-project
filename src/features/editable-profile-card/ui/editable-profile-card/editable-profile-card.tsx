import React, { useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { Country } from '@/entities/country';
import { Currency } from '@/entities/currency';
import { ProfileCard } from '@/entities/profile';
import { getUserAuthData } from '@/entities/user';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { VStack } from '@/shared/ui/stack';
import { Text, TextTheme } from '@/shared/ui/text/text';

import { getProfileError } from '../../model/selectors/get-profile-error/get-profile-error';
import { getProfileForm } from '../../model/selectors/get-profile-form/get-profile-form';
import { getProfileIsLoading } from '../../model/selectors/get-profile-is-loading/get-profile-is-loading';
import { getProfileValidateErrors } from
    '../../model/selectors/get-profile-validate-errors/get-profile-validate-errors';
import { getProfilerReadonly } from '../../model/selectors/get-profiler-readonly/get-profiler-readonly';
import { fetchProfileData } from '../../model/services/fetch-profile-data/fetch-profile-data';
import { profileActions, profileReducer } from '../../model/slice/profile-slice';
import { ValidateProfileError } from '../../model/types/editable-profile-card-schema';
import { EditableProfileCardHeader } from '../editable-profile-card-header/editable-profile-card-header';

const initReducers: ReducerList = {
    profile: profileReducer,
};

interface EditableProfileCardProps {
    className?: string;
    id: string;
}

export const EditableProfileCard = ({ className, id }: EditableProfileCardProps) => {
    const { t } = useTranslation('profile');

    const dispatch = useAppDispatch();
    const formData = useSelector(getProfileForm);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);
    const readonly = useSelector(getProfilerReadonly);
    const validateErrors = useSelector(getProfileValidateErrors);
    const user = useSelector(getUserAuthData);

    const validateErrorTranslate = {
        [ValidateProfileError.SERVER_ERROR]: t('Ошибка сервера'),
        [ValidateProfileError.NO_DATA]: t('Данные отсутствуют'),
        [ValidateProfileError.INCORRECT_USER_DATA]: t('Имя и Фамилия обязательны'),
        [ValidateProfileError.INCORRECT_AGE]: t('Некорректный возраст'),
    };

    useEffect(() => {
        if (id) {
            dispatch(fetchProfileData(String(id)));
        }
    }, [dispatch, id, user?.id]);

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
        dispatch(profileActions.updateForm({ age: Number(value) || 0 }));
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
            <VStack className={className} gap="16">
                <EditableProfileCardHeader />
                {validateErrors?.map((e) => (
                    <Text
                        key={e}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslate[e]}
                    />
                ))}
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
            </VStack>
        </DynamicModuleLoader>
    );
};
