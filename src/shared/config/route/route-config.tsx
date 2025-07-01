import {About} from "@/pages/about";
import {Main} from "@/pages/main";
import {RouteProps} from "react-router-dom";


export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about'
}

export const RoutePath: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.ABOUT]: '/about'
}

export const routeConfig: RouteProps[] = [
    {
        path: RoutePath[AppRoutes.MAIN],
        element: <Main/>
    },
    {
        path: RoutePath[AppRoutes.ABOUT],
        element: <About/>,
    },
]