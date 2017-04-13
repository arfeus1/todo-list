var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: 'app.bundle.js'
	},
	module: {
		rules: [
			{test: /\.scss$/, 
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader'],
					publicPath: '/dist'
				})
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loaders: ["file-loader?name=[name].[ext]&publicPath=/&outputPath=images/",
				{
					loader: 'image-webpack-loader'
				}],
				
			}
		]
	},

	devServer: {
		contentBase: path.join (__dirname, "dist"),
		compress: true,
		stats: 'errors-only',
		open: true
	},

	plugins: [
		new HtmlWebpackPlugin({
			title: 'ToDo List',
			/* minify: {
				collapseWhitespace: true
			},*/
			hash: true,
	    	template: './src/index.html',
		}),
		new ExtractTextPlugin({
			filename: 'app.css'
		}),
	]
}