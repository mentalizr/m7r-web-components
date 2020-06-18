// `CheckerPlugin` is optional. Use it if you want async error reporting.
// We need this plugin to detect a `--watch` mode. It may be removed later
// after https://github.com/webpack/webpack/issues/3460 will be resolved.
// import * as webpack from "webpack";

const { CheckerPlugin } = require('awesome-typescript-loader');
const webpack = require('webpack');
const path = require('path');

module.exports = {

    mode: 'development',

    entry: ['./src/index.ts',
        './node_modules/bootstrap/dist/js/bootstrap.bundle.js'],

    output: {
        filename: 'm7r-web-components.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "var",
        library: 'm7rWebComponents'
    },

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    },

    devServer: {
        serveIndex: true,
        // contentBase: path.join(__dirname, 'dist')
        // contentBase: './distNew'
    }

};