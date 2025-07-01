import {useTranslation} from "react-i18next";
import {classNames} from "@/shared/lib/class-names/class-names";
import styles from './lang-switcher.module.scss';
import {Button} from "@/shared/ui/button";
import {ThemeButton} from "@/shared/ui/button/ui/button";

interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({className}: LangSwitcherProps) => {
    const {t, i18n} = useTranslation();

    const toggleLang = () => {
        const lang = i18n.language === 'ru' ? 'en' : 'ru';
        i18n.changeLanguage(lang)
    }

    return (
        <Button
            onClick={toggleLang}
            className={classNames(styles.root, [className])}
            theme={ThemeButton.CLEAR}
        >
            {t('Язык')}
        </Button>
    )
}