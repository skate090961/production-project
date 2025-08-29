import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getUserAuthData, userActions } from '@/entities/user';
import { LoginModal } from '@/features/auth-by-username';
import { RoutePath } from '@/shared/config/route/route-config';
import { classNames } from '@/shared/lib/class-names/class-names';
import { AppLink, AppLinkTheme } from '@/shared/ui/app-link/app-link';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { Text, TextTheme } from '@/shared/ui/text/text';

import styles from './navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const authData = useSelector(getUserAuthData);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <header
                className={classNames(styles.root, [className])}
            >
                <Text
                    title={t('Production App')}
                    theme={TextTheme.INVERTED}
                    className={styles.logo}
                />
                <AppLink
                    to={RoutePath.article_create}
                    theme={AppLinkTheme.SECONDARY}
                >
                    {t('Создать статью')}
                </AppLink>
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    onClick={onLogout}
                    className={styles.authButton}
                >
                    {t('Выйти')}
                </Button>
            </header>
        );
    }

    return (
        <header
            className={classNames(styles.root, [className])}
        >
            <Text
                title={t('Production App')}
                theme={TextTheme.PRIMARY}
                className={styles.logo}
            />
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                onClick={onShowModal}
                className={styles.authButton}
            >
                {t('Войти')}
            </Button>
            <LoginModal
                isOpen={isAuthModal}
                onClose={onCloseModal}
            />
        </header>
    );
});
