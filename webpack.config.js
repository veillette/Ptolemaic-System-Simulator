const path = require('path');

module.exports = {
    entry: {
        css: './src/css.js',
        vendor: './src/vendor.js',
        bundle: './src/main.jsx',
    },
    mode: process.env.WEBPACK_SERVE ? 'development' : 'production',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/dist/',
        clean: true,
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    devServer: {
        // Serve the project root so index.html, css/ and img/ are reachable,
        // while the compiled bundles are exposed under /dist/.
        static: {
            directory: __dirname,
        },
        devMiddleware: {
            publicPath: '/dist/',
        },
        hot: true,
        open: true,
    }
};
