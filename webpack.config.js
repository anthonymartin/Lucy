const path = require('path');


module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
     contentBase: './'
  },
	module: {
		 loaders: [
				 {
						 test: /\.js$/,
						 loader: 'babel-loader',
             exclude: /node_modules/,
						 query: {
								 presets: ['es2015']
						 }
				 }
		 ]
	},
  node: {
      fs: 'empty'
  }
};
