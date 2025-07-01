import {Link} from "react-router-dom";
import './styles/index.scss'

import {classNames} from "@/shared/lib/class-names/class-names";
import {useTheme} from "@/app/providers/theme";
import {AppRouter} from "@/app/providers/router";

export function App() {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', [theme])}>
            <button onClick={toggleTheme}>Toggle theme</button>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О сайте</Link>
            <AppRouter />
        </div>
    )
}
