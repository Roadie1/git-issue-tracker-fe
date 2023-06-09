const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = (_env, argv) => {
    const config = {
        entry: './src/index.tsx',

        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'build'),
            publicPath: '/',
        },
        plugins: [
            new HTMLWebpackPlugin({
                template: path.join(__dirname, 'public', 'index.html')
            }),
            new Dotenv(),
        ],
        devServer: {
            static: {
                directory: path.join(__dirname, "build")
            },
            port: 3000,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
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
    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
    }
    return config;
}