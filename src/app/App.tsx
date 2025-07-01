import {Suspense} from "react";
import {Link, Route, Routes} from "react-router-dom";
import './styles/index.scss'

import {classNames} from "@/shared/lib/class-names/class-names";
import {useTheme} from "@/app/providers/theme";
import {About} from "@/pages/about";
import {Main} from "@/pages/main";

export function App() {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', [theme])}>
            <button onClick={toggleTheme}>Toggle theme</button>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О сайте</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/about'} element={<About/>}/>
                    <Route path={'/'} element={<Main/>}/>
                </Routes>
            </Suspense>
        </div>
    )
}
