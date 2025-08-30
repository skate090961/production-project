import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    getProfileData,
    getProfileIsLoading,
    getProfilerReadonly,
    profileActions,
    updateProfileData,
} from '@/entities/profile';
import { getUserAuthData } from '@/entities/user';
import { classNames } from '@/shared/lib/class-names/class-names';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { HStack } from '@/shared/ui/stack';
import { Text } from '@/shared/ui/text/text';

import styles from './profile-page-header.module.scss';

interface ProfilePageHeaderProps {
    className?: string;
}

export const ProfilePageHeader = ({ className }: ProfilePageHeaderProps) => {
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
        <HStack className={classNames(styles.root, [className])} justify="between">
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
