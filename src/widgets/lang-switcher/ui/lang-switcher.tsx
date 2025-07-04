import { useTranslation } from 'react-i18next';

import { Button, ButtonTheme } from '@/shared/ui/button/button';

interface LangSwitcherProps {
    className?: string;
    isShort?: boolean;
}

export const LangSwitcher = ({ className, isShort }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();

    const toggleLang = async () => {
        const lang = i18n.language === 'ru' ? 'en' : 'ru';
        i18n.changeLanguage(lang);
    };

    return (
        <Button
            onClick={toggleLang}
            theme={ButtonTheme.CLEAR}
            className={className}
        >
            {t(isShort ? 'Короткий язык' : 'Язык')}
        </Button>
    );
};
