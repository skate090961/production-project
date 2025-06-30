import {RuleSetRule} from "webpack";

export function buildLoaders(): RuleSetRule[] {
    const tscLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    return [
        tscLoader,
    ]
}