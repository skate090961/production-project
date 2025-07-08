import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LoginModal } from '@/features/auth-by-username';
import { classNames } from '@/shared/lib/class-names/class-names';
import { Button, ButtonTheme } from '@/shared/ui/button/button';

import styles from './navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = ({ className }: NavbarProps) => {
    const [isAuthModal, setIsAuthModal] = useState(false);
    const { t } = useTranslation();

    const onShowModal = useCallback(() => {
        setIsAuthModal(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false);
    }, []);

    return (
        <div
            className={classNames(styles.root, [className])}
        >
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
        </div>
    );
};
