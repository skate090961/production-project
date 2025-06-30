import {Configuration} from 'webpack';
import {buildWebpackConfig} from "./config/build/buildWebpackConfig";
import {BuildMode, BuildPaths} from "./config/build/types/config";
import path from "path";

const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html')
}

const mode = BuildMode.DEVELOPMENT;
const isDev = mode === BuildMode.DEVELOPMENT;

const config: Configuration = buildWebpackConfig({
    mode: BuildMode.PRODUCTION,
    paths,
    isDev
});

export default config;