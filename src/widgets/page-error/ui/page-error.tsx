import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Button } from '@/shared/ui/button/button';
import { VStack } from '@/shared/ui/stack';

import styles from './page-error.module.scss';

interface PageErrorProps {
    className?: string;
}

export const PageError = ({ className }: PageErrorProps) => {
    const { t } = useTranslation();

    const reloadPage = () => window.location.reload();

    return (
        <VStack
            className={classNames(styles.root, [className])}
            align="center"
            justify="center"
        >
            <h1>{t('Что-то пошло не так!')}</h1>
            <Button onClick={reloadPage}>{t('Обновить страницу')}</Button>
        </VStack>
    );
};
