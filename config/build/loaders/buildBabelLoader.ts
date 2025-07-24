import { BuildOptions } from '../types/config';

export function buildBabelLoader({ isDev }: BuildOptions) {
    return {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                plugins: [isDev && 'react-refresh/babel'].filter(Boolean),
            },
        },
    };
}
