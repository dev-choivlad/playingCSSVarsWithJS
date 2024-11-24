import * as pathNode from "path";

const srcFolder = 'src';
const buildFolder = 'dist';

const paths = {
  src: pathNode.resolve(srcFolder),
  build: pathNode.resolve(buildFolder),
}

export const webpackConfig = (isMode) => ({
  entry: ['@babel/polyfill', `${paths.src}/js/app.js`],
  mode: isMode ? 'development' : 'production',
  cache: {
    type: 'filesystem', // По умолчанию 'memory'
    cacheDirectory: `${paths.src}/.temporary_cache`,
  },
  output: {
    path: `${paths.build}/js`,
    filename: 'app.min.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
})
