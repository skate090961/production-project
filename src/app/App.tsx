import './styles/index.scss'

import {classNames} from "@/shared/lib/class-names/class-names";
import {useTheme} from "@/app/providers/theme";
import {AppRouter} from "@/app/providers/router";
import {Navbar} from "@/widgets/navbar";

export function App() {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', [theme])}>
            <Navbar/>
            <AppRouter />
            <button onClick={toggleTheme}>Toggle theme</button>
        </div>
    )
}
