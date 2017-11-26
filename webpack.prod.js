/**
* Webapack prod config.
*/

var 
  path = require('path'),
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin'),
  CompressionPlugin = require('compression-webpack-plugin'),
  AotPlugin = require('@ngtools/webpack').AotPlugin;

module.exports = {
  devtool : 'source-map',
	module: {
		rules: [
      { 
        test: /\.tsx?$/, 
        use: [
          '@ngtools/webpack'
        ] 
      },
			{
				test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
          	{
            	loader: 'css-loader',
           		options: { minimize: true }
           	}, 
           	{ loader: 'less-loader' }
          ],
          fallback: 'style-loader'
        })
			},
			{
				test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
          	{
           		loader: 'css-loader',
           		options: { minimize: true }
           	}, 
           	{ loader: 'sass-loader' }
          ],
          fallback: 'style-loader'
        })
			}
		]
	},
	plugins: [
    new AotPlugin({
      tsConfigPath: './tsconfig.json',
      entryModule: path.join(__dirname, './public/app.module#AppModule')
    }),
		new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false,
        drop_console: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      mangle: {
        keep_fnames: true,
        screw_i8: true
      },
      output: {
        comments: false
      },
      sourceMap: true
   	}),
    new CompressionPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: /\.js$/,
        threshold: 0,
        minRatio: 0.8
    }), 
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, 'public/img'), 
        to: path.join(__dirname, 'prod/img')
      },
      {
        from: path.join(__dirname, 'public/fonts'),
        to: path.join(__dirname, 'prod/fonts')
      }
    ]),
    new webpack.optimize.ModuleConcatenationPlugin()
	]
  
}