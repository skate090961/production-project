import { RuleSetRule } from 'webpack';

import { buildBabelLoader } from './loaders/buildBabelLoader';
import { buildStyleLoader } from './loaders/buildStyleLoader';
import { BuildOptions } from './types/config';

export function buildLoaders(options: BuildOptions): RuleSetRule[] {
    const babelLoader = buildBabelLoader(options);

    const fileLoader = {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        use: 'file-loader',
    };

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const tsLoader = {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const styleLoader = buildStyleLoader(options);

    return [
        babelLoader,
        tsLoader,
        styleLoader,
        svgLoader,
        fileLoader,
    ];
}
