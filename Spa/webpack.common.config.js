const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');



module.exports = {
  entry: {
    app: './src/index.tsx'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'idp_client_spa',
      meta: { viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no' },
      template: 'src/index.html',
      inject: true
    }),
  ],
  resolve: {
    mainFiles: ['index'],
    modules: ['node_modules'],
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      Hooks: path.resolve(__dirname, 'src/UI/Base/Hooks/'),
      Contexts: path.resolve(__dirname, 'src/UI/Base/Context/'),
      Components: path.resolve(__dirname, 'src/UI/Base/Components/'),
      ui: path.resolve(__dirname, 'src/UI/'),
      requests: path.resolve(__dirname, 'src/requests/'),
      domain: path.resolve(__dirname, 'src/domain/'),
      configs: path.resolve(__dirname, 'src/configs/'),
      actions: path.resolve(__dirname, 'src/actions/'),
      states: path.resolve(__dirname, 'src/states/'),
      reducers: path.resolve(__dirname, 'src/reducers/'),
      src: path.resolve(__dirname, 'src/'),
    }
  },
  // webpack does not tell whether you installed listed loader until it is used. so be careful
  // don't include "include" option if you are intended to include node modoule resource
  module: {
    rules: [
      {
        test: /\.m?(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        include: path.resolve(__dirname, 'src'),
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        options: {
        }
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
        test: /\.(s[ac]ss|css)$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'images',
            }
          }
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          'file-loader'
        ]
      }
      //]
      //{
      //test: /\.(csv|tsv)$/,
      //include: path.resolve(__dirname, 'src'),
      //use: [
      //'csv-loader'
      //]
      //},
      //{
      //test: /\.xml$/,
      //include: path.resolve(__dirname, 'src'),
      //use: [
      //'xml-loader'
      //]
      //}
    ]
  }
};
