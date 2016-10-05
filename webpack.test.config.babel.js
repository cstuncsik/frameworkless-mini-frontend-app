export default {
    devtool: 'inline-source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel'
            }
        ],
        postLoaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|tests)/,
                loader: 'istanbul-instrumenter'
            }
        ]
    }
};
