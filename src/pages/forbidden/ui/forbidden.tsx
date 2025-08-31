import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/class-names/class-names';
import { HStack } from '@/shared/ui/stack';
import { Page } from '@/widgets/page/page';

import styles from './forbidden.module.scss';

interface ForbiddenProps {
    className?: string;
}

export const Forbidden = ({ className }: ForbiddenProps) => {
    const { t } = useTranslation();
    return (
        <Page className={classNames(styles.root, [className])}>
            <HStack justify="center" align="center">
                {t('Нет доступа')}
            </HStack>
        </Page>
    );
};
