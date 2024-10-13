import {Configuration} from "webpack";
import {BuildOptions} from "./types/types";

export function buildResolvers(opts: BuildOptions): Configuration['resolve'] {
    return {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            '@img': opts.paths.assets + '/images',
            '@assets': opts.paths.assets,
            '@src': opts.paths.src,
            '@comp': opts.paths.src + '/components'
        }
    }
}