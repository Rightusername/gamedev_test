import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import { VueLoaderPlugin } from 'vue-loader'
import path from 'path'
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


const { NODE_ENV = 'development' } = process.env

const base = {
  context: __dirname,
  entry: {
    'index': './app/index.js',
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, './app/styles/'),
      assets: path.resolve(__dirname, './app/assets/'),
      app: path.resolve(__dirname, './app/'),
    }
  },
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: './js/[name].js'
  },
  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
          },
          {
            loader: "vue-svg-inline-loader",
            options: {
              svgo: false
            }
          }
        ]
      },
      {
        test: /.*\.(gif|png|jpe?g|svg)$/i,
        use: [{
          loader: 'file-loader',
          options: {
            outputPath: (url, resourcePath, context) => {
              const relativePath = path.relative(context, resourcePath);

              // // remove dir name app/ = 4 symbols
              return `${relativePath.slice(4).replace(/\\/gi, '/')}`;
            },
          },
        }, ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: {
                  modules: true,
                  localIdentName: '[local]_[hash:base64:5]'
                }
              }
            ]
          },
          {
            use: [
              'vue-style-loader',
              'css-loader'
            ]
          }
        ]
      },

      {
        test: /\.scss$/,
        oneOf: [{
          resourceQuery: /module/,
          use: [
            'vue-style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[name]__[local]_[hash:base64:8]'
              }
            },
            'resolve-url-loader',
            'sass-loader'
          ]
        },
        {
          use: [
            'vue-style-loader',
            'css-loader',
            'resolve-url-loader',
            'sass-loader'
          ]
        }
        ]
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      { from: './app/assets/js', to: './assets' },
      { from: './app/assets/static', to: './assets/static' },
      { from: './app/public_files', to: './' },
    ]),
    new HtmlWebpackPlugin({
      template: './app/template.html',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    })
  ]
}

const development = {
  ...base,
  mode: 'development',
  devtool: '#eval-module-source-map',
  watch: true,
  devServer: {
    writeToDisk: true,
    compress: true,
    historyApiFallback: true,
    port: 4200,
  },
  module: {
    ...base.module
  },
  plugins: [
    ...base.plugins,
    new webpack.HotModuleReplacementPlugin(),
  ]
}

const production = {
  ...base,
  output: {
    path: path.join(__dirname, 'docs'),
    publicPath: '/',
    filename: 'js/[name].[contenthash].js'
  },
  mode: 'production',
  devtool: false,

  plugins: [
    new CleanWebpackPlugin(),
    ...base.plugins,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        terserOptions: {
          compress: {
            drop_console: true,
          }
        }
      })
    ]
  }
}

if (NODE_ENV === 'development') {
  module.exports = development
} else {
  module.exports = production
}
