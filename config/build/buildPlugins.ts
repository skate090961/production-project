import HTMLWebpackPlugin from "html-webpack-plugin";
import {ProgressPlugin, WebpackPluginInstance} from "webpack";
import {BuildOptions} from "./types/config";

export function buildPlugins({paths}: BuildOptions): WebpackPluginInstance[] {
    return [
        new HTMLWebpackPlugin({
            template: paths.html
        }),
        new ProgressPlugin()
    ]
}