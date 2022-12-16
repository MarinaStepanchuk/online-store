const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.config');

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.resolve(__dirname, '../dist'),
    },
};

module.exports = merge(baseConfig, devConfig);
