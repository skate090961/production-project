import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/user';
import { LoginModal } from '@/features/auth-by-username';
import { AvatarMenu } from '@/features/avatar-menu';
import { NotificationsButton } from '@/features/notifications-button';
import { RoutePath } from '@/shared/config/route/route-config';
import { classNames } from '@/shared/lib/class-names/class-names';
import { AppLink, AppLinkTheme } from '@/shared/ui/app-link/app-link';
import { Button, ButtonTheme } from '@/shared/ui/button/button';
import { HStack } from '@/shared/ui/stack';
import { Text, TextTheme } from '@/shared/ui/text/text';

import styles from './navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();
    const authData = useSelector(getUserAuthData);

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

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
                <HStack justify="between" maxWidth>
                    <AppLink
                        to={RoutePath.article_create}
                        theme={AppLinkTheme.SECONDARY}
                    >
                        {t('Создать статью')}
                    </AppLink>
                    <HStack gap="16">
                        <NotificationsButton />
                        <AvatarMenu />
                    </HStack>
                </HStack>
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
                className={styles.dropdown}
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
