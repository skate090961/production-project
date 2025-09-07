import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { BuildOptions } from '../types/config';

export function buildStyleLoader({ isDev }: BuildOptions) {
    return {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
            isDev
                ? 'style-loader'
                : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: /\.module\.\w+$/i,
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]',
                    },
                },
            },
            'sass-loader',
        ],
    };
}
