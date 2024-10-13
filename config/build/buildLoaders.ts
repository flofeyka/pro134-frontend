import {ModuleOptions} from 'webpack'
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildLoaders(): ModuleOptions["rules"] {
    return [
        {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
                {
                    loader:'@svgr/webpack',
                    options: {
                        icon: true
                    }
                }
            ],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            type: 'asset/resource'
        },
        {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            type: 'asset/resource',
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, 'css-loader'],
            include: /\.css$/
        },
        {
            test: /\.tsx?$/,
            use: "ts-loader",
            exclude: /node_modules/,
        }
    ]
}