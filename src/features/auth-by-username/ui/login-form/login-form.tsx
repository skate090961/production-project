import {
    KeyboardEvent, KeyboardEventHandler, memo, useCallback,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/class-names/class-names';
import { DynamicModuleLoader, ReducerList } from '@/shared/lib/components/dynamic-module-loader/dynamic-module-loader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Input } from '@/shared/ui/input/input';
import { VStack } from '@/shared/ui/stack';
import { Text, TextTheme } from '@/shared/ui/text/text';

import { getLoginError } from '../../model/selectors/get-login-error/get-login-error';
import { getLoginIsLoading } from '../../model/selectors/get-login-is-loading/get-login-is-loading';
import { getLoginPassword } from '../../model/selectors/get-login-password/get-login-password';
import { getLoginUsername } from '../../model/selectors/get-login-username/get-login-username';
import { loginByUsername } from '../../model/services/login-by-username/login-by-username';
import { loginActions, loginReducer } from '../../model/slice/login-slice';

import styles from './login-form.module.scss';

export interface LoginFormProps {
    className?: string;
    onSuccess?: () => void;
}

const initReducers: ReducerList = {
    loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const username = useSelector(getLoginUsername);
    const password = useSelector(getLoginPassword);
    const error = useSelector(getLoginError);
    const isLoading = useSelector(getLoginIsLoading);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.updateUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.updatePassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }));
        if (loginByUsername.fulfilled.match(result)) {
            if (onSuccess) {
                onSuccess();
            }
        }
    }, [dispatch, onSuccess, password, username]);

    const onFormKeyDown = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (!username || !password) {
            return;
        }

        if (e.key === 'Enter') {
            onLoginClick();
        }
    }, [onLoginClick, password, username]);

    return (
        <DynamicModuleLoader
            reducers={initReducers}
            removeAfterUnmount
        >
            <VStack
                className={classNames(styles.root, [className])}
                gap="16"
                onKeyDown={onFormKeyDown}
            >
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
            </VStack>
        </DynamicModuleLoader>
    );
});

export default LoginForm;
