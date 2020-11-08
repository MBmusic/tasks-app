const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDevMode = process.env.NODE_ENV !== 'production';
const isProdMode = !isDevMode;

module.exports = {
    mode: "development",
    entry: __dirname + '/src/index.js',
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'public'),
        publicPath: '/'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        compress: true,
        port: 9000,
        writeToDisk: true,
        historyApiFallback: true,
        /*proxy: {
            '/': 'http://localhost:3020',
            changeOrigin: true
        }*/
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: __dirname + '/src/index.html',
            minify: {
                collapseWhitespace: isProdMode
            }
        }),
        new MiniCssExtractPlugin({
            filename: "./css/main.css",
            allChunks: false,
            minimize: true,
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use:  [
                    {
                        loader:  MiniCssExtractPlugin.loader,
                        options: {
                            hmr: true,
                            minimize:   true,
                        },
                    },
                    "css-loader",
                    "sass-loader"
                ],
            }
        ]
    }
}