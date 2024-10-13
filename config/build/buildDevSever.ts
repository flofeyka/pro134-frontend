import type {Configuration as DevServerConfiguration} from 'webpack-dev-server'
import {BuildOptions} from "./types/types";
export function buildDevSever(opts: BuildOptions): DevServerConfiguration {
    return {
        port: opts.port ?? 3000,
        open: true,
        historyApiFallback: true
    }
}