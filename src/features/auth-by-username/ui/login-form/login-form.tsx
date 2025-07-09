import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Input } from '@/shared/ui/input/input';
import { Text, TextTheme } from '@/shared/ui/text/text';

import { getLoginState } from '../../model/selectors/get-login-state/get-login-state';
import { loginByUsername } from '../../model/services/login-by-username/login-by-username';
import { loginActions } from '../../model/slice/login-slice';

import styles from './login-form.module.scss';

interface LoginFormProps {
    className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const {
        password,
        username,
        isLoading,
        error,
    } = useSelector(getLoginState);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.updateUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.updatePassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }));
    }, [dispatch, password, username]);

    return (
        <div className={classNames(styles.root, [className])}>
            <div>
                <Text title={t('Форма авторизации')} />
                {error && (
                    <Text
                        theme={TextTheme.ERROR}
                        text={t('Вы ввели неверный логин или пароль')}
                    />
                )}
            </div>

            <Input
                onChange={onChangeUsername}
                value={username}
                placeholder={t('Введите username')}
                autofocus
            />
            <Input
                onChange={onChangePassword}
                value={password}
                placeholder={t('Введите пароль')}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                onClick={onLoginClick}
                disabled={isLoading}
            >
                {t('Войти')}
            </Button>
        </div>
    );
});
