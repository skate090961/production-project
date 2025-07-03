import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/class-names/class-names';
import { Button, ThemeButton } from '@/shared/ui/button/button';

import styles from './lang-switcher.module.scss';

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggleLang = async () => {
        const lang = i18n.language === 'ru' ? 'en' : 'ru';
        i18n.changeLanguage(lang);
    };

    return (
        <Button
            onClick={toggleLang}
            className={classNames(styles.root, [className])}
            theme={ThemeButton.CLEAR}
        >
            {t('Язык')}
        </Button>
    );
};
