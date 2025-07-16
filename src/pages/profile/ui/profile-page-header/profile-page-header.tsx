import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import {
    getProfileIsLoading, getProfilerReadonly, profileActions, updateProfileData,
} from '@/entities/profile';
import { classNames } from '@/shared/lib/class-names/class-names';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
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

    const onEdit = () => {
        dispatch(profileActions.updateReadonly(false));
    };

    const onCancelEdit = () => {
        dispatch(profileActions.cancelEdit());
    };

    const onSave = () => {
        dispatch(updateProfileData());
    };

    return (
        <div className={classNames(styles.root, [className])}>
            <Text title={t('Профиль')} />
            <div className={styles.controls}>
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
            </div>
        </div>
    );
};
