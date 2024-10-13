import {Configuration} from "webpack";
import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildDevSever} from "./buildDevSever";
import {buildResolvers} from "./buildResolvers";
import {BuildOptions} from "./types/types";

export function buildWebpack(opts: BuildOptions): Configuration {
    return {
        mode: opts.mode ?? 'development',
        entry: opts.paths.entry,
        output: {
            filename: "bundle-[contenthash].js",
            path: opts.paths.output,
            clean: true,
            publicPath: '/'
        },
        plugins: buildPlugins(opts),
        module: {
            rules: buildLoaders()
        },
        resolve: buildResolvers(opts),
        devtool: 'inline-source-map',
        devServer: buildDevSever(opts)
    }
}