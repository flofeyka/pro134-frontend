import {buildWebpack} from "./config/build/buildWebpack";
import {BuildOptions} from "./config/build/types/types";
import path from "path";

const options: BuildOptions = {
    mode: "development",
    port: 3000,
    paths: {
        html: path.resolve(__dirname, 'src', 'index.html'),
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'dist'),
        src: path.resolve(__dirname, 'src'),
        assets: path.resolve(__dirname, 'src', 'assets'),
    }
}

export default buildWebpack(options)
