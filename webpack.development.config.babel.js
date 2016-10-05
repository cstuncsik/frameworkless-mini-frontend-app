import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReloadHtmlWebpackPlugin from 'reload-html-webpack-plugin';

const contentBase = './src';

export default {
    context: __dirname,
    entry : [`${contentBase}/app.js`],
    devServer: {
        contentBase
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: `${contentBase}/index.html`
        }),
        new ReloadHtmlWebpackPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css?sourceMap', 'postcss?browsers=last 2 versions', 'sass?sourceMap']
            }
        ]
    }
};
