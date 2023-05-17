const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './index.tsx',
    devtool: 'inline-source-map',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "build")
        },
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            {
                test: /\.scss/i,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js", ".tsx"],
    },
}