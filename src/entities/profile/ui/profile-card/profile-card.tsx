import { useTranslation } from 'react-i18next';

import { Country, CountrySelect } from '@/entities/country';
import { Currency, CurrencySelect } from '@/entities/currency';
import { classNames } from '@/shared/lib/class-names/class-names';
import { Avatar } from '@/shared/ui/avatar/avatar';
import { Input } from '@/shared/ui/input/input';
import { Loader } from '@/shared/ui/loader/loader';
import { HStack, VStack } from '@/shared/ui/stack';
import { Text, TextAlign, TextTheme } from '@/shared/ui/text/text';

import { Profile } from '../../model/types/profile';

import styles from './profile-card.module.scss';

interface ProfileCardProps {
    className?: string;
    data?: Profile;
    isLoading?: boolean;
    error?: string;
    readonly?: boolean;
    onChangeFirstname?: (value: string) => void;
    onChangeLastname?: (value: string) => void;
    onChangeCity?: (value: string) => void;
    onChangeAge?: (value: string) => void;
    onChangeUsername?: (value: string) => void;
    onChangeAvatar?: (value: string) => void;
    onChangeCountry?: (value: Country) => void;
    onChangeCurrency?: (value: Currency) => void;
}

export const ProfileCard = (props: ProfileCardProps) => {
    const { t } = useTranslation('profile');
    const {
        className,
        data,
        readonly,
        error,
        isLoading,

        onChangeFirstname,
        onChangeLastname,
        onChangeCity,
        onChangeAge,
        onChangeUsername,
        onChangeAvatar,
        onChangeCurrency,
        onChangeCountry,
    } = props;

    if (isLoading) {
        return (
            <HStack className={classNames(styles.root, [styles.loading])} justify="center">
                <Loader />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack className={classNames(styles.root, [styles.error])} justify="center">
                <Text
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                    title={t('Произошла ошибка при загрузке профиля')}
                    text={t('Попробуйте обновить страницу')}
                />
            </HStack>
        );
    }

    return (
        <div className={classNames(styles.root, [className], { [styles.readonly]: !readonly })}>
            <VStack gap="16" align="start">
                <HStack justify="center" maxWidth>
                    <Avatar
                        src={data?.avatar}
                    />
                </HStack>
                <Input
                    value={data?.firstname}
                    placeholder={t('Имя')}
                    readOnly={readonly}
                    onChange={onChangeFirstname}
                />
                <Input
                    value={data?.lastname}
                    placeholder={t('Фамилия')}
                    readOnly={readonly}
                    onChange={onChangeLastname}
                />
                <Input
                    value={data?.city}
                    placeholder={t('Город')}
                    readOnly={readonly}
                    onChange={onChangeCity}
                />
                <Input
                    value={data?.age}
                    placeholder={t('Возраст')}
                    readOnly={readonly}
                    onChange={onChangeAge}
                />
                <Input
                    value={data?.username}
                    placeholder={t('Имя пользователя')}
                    readOnly={readonly}
                    onChange={onChangeUsername}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t('Cсылка на аватар')}
                    readOnly={readonly}
                    onChange={onChangeAvatar}
                />
                <CurrencySelect
                    value={data?.currency}
                    onChange={onChangeCurrency}
                    readonly={readonly}
                />
                <CountrySelect
                    value={data?.country}
                    onChange={onChangeCountry}
                    readonly={readonly}
                />
            </VStack>
        </div>
    );
};
