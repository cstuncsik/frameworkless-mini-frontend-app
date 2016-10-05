import HtmlWebpackPlugin from 'html-webpack-plugin';

const contentBase = './src';

export default {
    context: __dirname,
    entry : `${contentBase}/app.js`,
    output: {
        path: 'dist',
        filename: 'app-[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${contentBase}/index.html`,
            minify: {
                collapseBooleanAttributes: true,
                collapseInlineTagWhitespace: true,
                collapseWhitespace: true
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'postcss?browsers=last 2 versions', 'sass']
            }
        ]
    }
};
