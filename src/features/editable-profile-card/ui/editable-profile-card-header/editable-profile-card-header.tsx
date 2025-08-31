import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/user';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { HStack } from '@/shared/ui/stack';
import { Text } from '@/shared/ui/text/text';

import { getProfileData } from '../../model/selectors/get-profile-data/get-profile-data';
import { getProfileIsLoading } from '../../model/selectors/get-profile-is-loading/get-profile-is-loading';
import { getProfilerReadonly } from '../../model/selectors/get-profiler-readonly/get-profiler-readonly';
import { updateProfileData } from '../../model/services/update-profile-data/update-profile-data';
import { profileActions } from '../../model/slice/profile-slice';

interface ProfilePageHeaderProps {
    className?: string;
}

export const EditableProfileCardHeader = ({ className }: ProfilePageHeaderProps) => {
    const { t } = useTranslation('profile');
    const dispatch = useAppDispatch();

    const readonly = useSelector(getProfilerReadonly);
    const isLoading = useSelector(getProfileIsLoading);
    const authData = useSelector(getUserAuthData);
    const profileData = useSelector(getProfileData);

    const canEdit = authData?.id === profileData?.id;

    const onEdit = useCallback(() => {
        dispatch(profileActions.updateReadonly(false));
    }, [dispatch]);

    const onCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const onSave = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <HStack className={className} justify="between">
            <Text title={t('Профиль')} />
            {canEdit && (
                <HStack gap="16">
                    {readonly ? (
                        <Button
                            theme={ButtonTheme.OUTLINE}
                            onClick={onEdit}
                        >
                            {t('Редактировать')}
                        </Button>
                    ) : (
                        <>
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={onCancelEdit}
                                disabled={isLoading}
                            >
                                {t('Отменить')}
                            </Button>
                            <Button
                                theme={ButtonTheme.OUTLINE}
                                onClick={onSave}
                                disabled={isLoading}
                            >
                                {t('Сохранить')}
                            </Button>
                        </>
                    )}
                </HStack>
            )}
        </HStack>
    );
};
