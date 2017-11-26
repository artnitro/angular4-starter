/**
* Webapack config.
*/

var 
	webpack = require('webpack'),
	path = require('path'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	merge = require('webpack-merge');

var 
	dev = require('./webpack.dev'),
	prod = require('./webpack.prod');

module.exports = function(env) {

	var 
		PATHS = {
			app: path.join(__dirname, 'public/app.ts'),
			build: path.join(__dirname, 'public')
		},
		setWatch = true,
		isProduction = env.production === true;
		
	(isProduction)
		? ( 
				process.env.NODE_ENV = 'production',
				PATHS.build = path.join(__dirname, 'prod'),
				setWatch = false
			)
		: process.env.NODE_ENV = 'development'

	var common = {
		watch: setWatch,
		watchOptions: {
			ignored: [
				/node_modules/,
				/fonts/,
				/img/,
				/favicon.ico/
			]
		},
		entry: {
			app: PATHS.app, 
			vendor: [
				'@angular/common',
   			'@angular/core',
    		'@angular/forms',    			
    		'@angular/http',
    		'@angular/platform-browser',
   	 		'@angular/platform-browser-dynamic',
    		'@angular/router',
    		'rxjs',
    		'zone.js/dist/zone',
    		'zone.js/dist/long-stack-trace-zone'
			],
			polyfills: [
		  	'core-js/es6',
    		'core-js/es7/reflect',
    		'ie-shim', 
    		'reflect-metadata'
			]
		},
		output: {
			path: PATHS.build,
			filename: 'src/[name].js',
		},
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx']
		},
		module: {
			rules: [
     		{ 
     			test: /\.html$/, 
     			loader: 'raw-loader' 
     		},
     		{
					test: /\.(png|jpg|jpeg|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'img/'
							}
						}
					]
				},
				{
        	test: /\.(eot|svg|ttf|woff|woff2)$/,
        	use: [
        		{
        			loader: 'file-loader',
        			options: {
        				name: '[name].[ext]',
        				outputPath: 'fonts/'
        			}
        		}
        	]
      	},
     	]
		},
		plugins: [
			new ExtractTextPlugin({
				filename: 'styles.css',
				allChunks: true
			}),
			new webpack.optimize.CommonsChunkPlugin({
     		name: ['app', 'vendor', 'polyfills']
    	}),
    	new webpack.DefinePlugin({
  			'an_ENVIRONMENT': JSON.stringify(process.env.NODE_ENV)
  		}),
  		new HtmlWebpackPlugin({
      	template: '!!raw-loader!public/templates/index/index.html',
      	inject: 'body',
      	minify: false,
      	favicon: './public/favicon.ico'
    	})
		]	
	};

	return config = (isProduction)
		? merge(common, prod)
		: merge(common, dev)

}

