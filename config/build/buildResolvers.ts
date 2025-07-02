import { ResolveOptions } from 'webpack';

import { BuildOptions } from './types/config';

export function buildResolvers({ paths }: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        mainFiles: ['index'],
        alias: {
            '@': paths.src,
        },
    };
}
