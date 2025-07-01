import {lazy} from "react";

export const AboutLazy = lazy(() => new Promise(res => {
    // @ts-ignore
    // fake delay for tests
    setTimeout(() => res(import('./about')), 1500)
}))