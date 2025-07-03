import { useTranslation } from 'react-i18next';

import { Button, ThemeButton } from '@/shared/ui/button/button';

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
            theme={ThemeButton.CLEAR}
        >
            {t('Язык')}
        </Button>
    );
};
