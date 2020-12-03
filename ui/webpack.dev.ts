import webpack from 'webpack';
import path from 'path';
import HtmlWebPackPlugin from 'html-webpack-plugin';

const htmlPlugin = new HtmlWebPackPlugin({
  template: path.resolve('public/index.html'),
  filename: './index.html',
});

const config: webpack.Configuration = {
  mode: 'development',
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  output: {
    path: path.resolve('dist'),
    publicPath: '/',
    filename: 'bundle.[hash].js',
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    port: 3000,
    proxy: {
      '/api/*': {
        target: 'http://localhost:9000/',
      },
    },
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
    ],
  },
  plugins: [htmlPlugin],
};

export default config;
