import {Suspense} from "react";
import {Link, Route, Routes} from "react-router-dom";
import './styles/index.scss'
import {AboutLazy} from "./pages/about/about.lazy";
import {MainLazy} from "./pages/main/main.lazy";
import {useTheme} from "./theme/useTheme";
import {classNames} from "./helpers/class-names/class-names";


export function App() {
    const {theme, toggleTheme} = useTheme();

    return (
        <div className={classNames('app', [theme])}>
            <button onClick={toggleTheme}>Toggle theme</button>
            <Link to={'/'}>Главная</Link>
            <Link to={'/about'}>О сайте</Link>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path={'/about'} element={<AboutLazy/>}/>
                    <Route path={'/'} element={<MainLazy/>}/>
                </Routes>
            </Suspense>
        </div>
    )
}
