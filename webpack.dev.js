/**
* Webpack dev config.
*/ 

var
	webpack = require('webpack'),
	ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

	module: {
		rules: [
			{
     	 	test: /\.tsx?$/,
     	 	use: [
     			'awesome-typescript-loader',
     			'angular2-template-loader'
     	 	]
     	},
			{
				test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
          	{ loader: 'css-loader' }, 
           	{ loader: 'less-loader' }
          ],
          fallback: 'style-loader'
        })
			},
			{
				test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
          	{ loader: 'css-loader' }, 
            { loader: 'sass-loader' }
          ],
          fallback: 'style-loader'
        })
			}
		]
	}
	
}