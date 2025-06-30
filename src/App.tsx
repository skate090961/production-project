import {Suspense} from "react";
import {Link, Route, Routes} from "react-router-dom";
import './index.scss'
import {AboutLazy} from "./pages/about/about.lazy";
import {MainLazy} from "./pages/main/main.lazy";

export function App() {
    return (
        <div className={'app'}>
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
