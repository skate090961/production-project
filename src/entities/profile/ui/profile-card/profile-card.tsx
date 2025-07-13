import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Input } from '@/shared/ui/input/input';
import { Text } from '@/shared/ui/text/text';

import { getProfileData } from '../../model/selectors/get-profile-data/get-profile-data';
import { getProfileError } from '../../model/selectors/get-profile-error/get-profile-error';
import { getProfileIsLoading } from '../../model/selectors/get-profile-is-loading/get-profile-is-loading';

import styles from './profile-card.module.scss';

interface ProfileCardProps {
    className?: string;
}

export const ProfileCard = ({ className }: ProfileCardProps) => {
    const { t } = useTranslation('profile');
    const data = useSelector(getProfileData);
    const isLoading = useSelector(getProfileIsLoading);
    const error = useSelector(getProfileError);

    return (
        <div className={classNames(styles.root, [className])}>
            <div className={styles.header}>
                <Text title={t('Профиль')} />
                <Button theme={ButtonTheme.OUTLINE}>
                    {t('Редактировать')}
                </Button>
            </div>
            <div className={styles.data}>
                <Input
                    value={data?.firstname}
                    placeholder={t('Имя')}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Фамилия')}
                />
            </div>
        </div>
    );
};
