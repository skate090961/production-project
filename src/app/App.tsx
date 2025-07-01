import './styles/index.scss'
import {classNames} from "@/shared/lib/class-names/class-names";
import {useTheme} from "@/app/providers/theme";
import {AppRouter} from "@/app/providers/router";
import {Sidebar} from "@/widgets/sidebar";
import {Navbar} from "@/widgets/navbar";

export function App() {
    const {theme} = useTheme();

    return (
        <div className={classNames('app', [theme])}>
            <Navbar/>
            <div className={'content-page'}>
                <Sidebar/>
                <div className={'page-wrapper'}>
                    <AppRouter />
                </div>
            </div>
        </div>
    )
}
