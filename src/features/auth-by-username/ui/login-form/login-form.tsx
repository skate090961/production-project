import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Button } from '@/shared/ui/button/button';
import { Input } from '@/shared/ui/input/input';

import styles from './login-form.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.root, [className])}>
            <Input placeholder={t('Введите логин')} autofocus />
            <Input placeholder={t('Введите пароль')} />
            <Button>{t('Войти')}</Button>
        </div>
    );
};
