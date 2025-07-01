import './styles/index.scss'

import {classNames} from "@/shared/lib/class-names/class-names";
import {useTheme} from "@/app/providers/theme";
import {AppRouter} from "@/app/providers/router";
import {Navbar} from "@/widgets/navbar";

export function App() {
    const {theme} = useTheme();

    return (
        <div className={classNames('app', [theme])}>
            <Navbar/>
            <AppRouter />
        </div>
    )
}
