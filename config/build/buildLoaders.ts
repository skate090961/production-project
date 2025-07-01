import {RuleSetRule} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/config";

export function buildLoaders({isDev}: BuildOptions): RuleSetRule[] {
    const fileLoader = {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        use: 'file-loader'
    }

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    }

    const tscLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    }

    const styleLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev
                ? "style-loader"
                : MiniCssExtractPlugin.loader,
            {
                loader: "css-loader",
                options: {
                    modules: {
                        auto: /\.module\.\w+$/i,
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]'
                    }
                }
            },
            "sass-loader",
        ],
    }

    return [
        tscLoader,
        styleLoader,
        svgLoader,
        fileLoader
    ]
}