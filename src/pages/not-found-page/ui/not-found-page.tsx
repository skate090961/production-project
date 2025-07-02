import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/class-names/class-names';

import styles from './not-found-page.module.scss';

interface NotFoundPageProps {
    className?: string;
}

export const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.root, [className])}>
            {t('Страница не найдена')}
        </div>
    );
};
