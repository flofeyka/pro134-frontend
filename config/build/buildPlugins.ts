import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export function buildPlugins(opts: BuildOptions): Configuration["plugins"] {
    return [
        new HtmlWebpackPlugin({
            template: opts.paths.html,
            favicon: opts.paths.assets + '/images/favicon.jpg'
        }),
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        })
    ]
}