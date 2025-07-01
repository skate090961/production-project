import {classNames} from "@/shared/lib/class-names/class-names";
import styles from './sidebar.module.scss';
import {useState} from "react";
import {Button} from "@/shared/ui/button";
import {ThemeSwitcher} from "@/widgets/theme-switcher";

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({className}: SidebarProps) => {
    const [isCollapsed, setIsCollapsed] = useState(false)

    const onToggle = () => {
        setIsCollapsed(prev => !prev)
    }

    return (
        <aside className={classNames(styles.root, [className], {[styles.collapsed]: isCollapsed})}
               aria-label="Боковая панель"
        >
            <Button onClick={onToggle}>Скрыть</Button>
            <div className={styles.switchers}>
                <ThemeSwitcher/>
                {/*<LangSwitcher/>*/}
            </div>
        </aside>
    );
};