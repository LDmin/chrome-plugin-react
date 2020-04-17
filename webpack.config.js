const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
  return {
    resolve: {
      modules: ['./node_modules'],
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    mode: 'development',
    // devtool: 'source-map',
    devtool: 'inline-source-map',
    entry: {
      background: './src/background/index.tsx',
      popup: './src/popup/index.tsx',
      setup: './src/setup/index.tsx',
      inject: './src/setup/inject.tsx',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].bundle.js'
    },
    module: {
      rules: [{
          test: /\.tsx?$/,
          use: [{
            loader: 'ts-loader',
            // options: {
            //   // 指定特定的ts编译配置，为了区分脚本的ts配置
            //   configFile: path.resolve(__dirname, './tsconfig.json'),
            // },
          }, ],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: [{
              loader: MiniCssExtractPlugin.loader
            },
            'css-loader'
          ]
        },
        {
          test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
          use: 'file-loader?limit=100000'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            'file-loader?limit=100000',
            {
              loader: 'img-loader',
              options: {
                enabled: true,
                optipng: true
              }
            }
          ]
        }
      ]
    },
    stats: {
      children: false,
      chunks: false,
      chunkModules: false,
      chunkOrigins: false,
      modules: false
    },
    performance: {
      hints: false
    },
    plugins: [
      // new webpack.DefinePlugin({
      //   'process.env': {
      //     NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      //     VERSION: '2',
      //   }
      // }),
      // new MiniCssExtractPlugin({
      //   filename: '[name].css',
      //   chunkFilename: '[id].css'
      // }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['popup'],
        filename: 'popup.html',
        template: './src/popup/index.html'
      }),
      new HtmlWebpackPlugin({
        inject: true,
        chunks: ['setup'],
        filename: 'setup.html',
        template: './src/setup/index.html'
      }),
      // copy extension manifest and icons
      new CopyWebpackPlugin([{
          from: './src/manifest.json'
        },
        {
          context: './src/assets',
          from: '*',
          to: 'assets'
        }
      ]),
      // new BundleAnalyzerPlugin()
    ],
  };
}