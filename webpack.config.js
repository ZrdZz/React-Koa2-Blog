const webpack = require('webpack');

module.exports = {
	entry:
		[
			'webpack-dev-server/client?http://localhost:8080',
    		__dirname + '/app/index.js'
	    ],

	output: {
		path: __dirname + "/build",           //打包后的文件存放的地方
		filename: "bundle.js",                 //打包后的文件名
		publicPath: "/build/"
	},

	devtool: 'eval-source-map',

	module: {
		rules: [
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",     //匹配到jsx或js结尾的文件就用babel-loader进行转换,转换过程依次使用plugins和presets制定的扩展
					options: {
						presets: ["env","stage-0" ,"react"]   //从右到左执行
					}
				},
				exclude: /node_modules/
			},

			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},
					{
						loader: "css-loader",
						options: {
							modules: true
						}
					},
					{
						loader: "postcss-loader"
					}
				],
				exclude: /node_modules/
			},

			{
				test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
				use: [
					{
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            outputPath: 'images/'   //图片打包后放在imgs文件夹下
                        }
					}
				],
				exclude: /node_modules/
			},

			{
				test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
				use: [
					{
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images/'   //图片打包后放在imgs文件夹下
                        }
					}
				],
				exclude: /node_modules/
			},

			{
                test: /\.(eot|woff|ttf|woff2|svg)$/,
				use: [
					{
                        loader: 'url-loader',
                        options: {
                            outputPath: 'fonts/'   //图片打包后放在imgs文件夹下
                        }
					}
				]
            }
		]
	},

	devServer: {
    	hot: true,
    	host: 'localhost',
    	port: 8080,
    	contentBase: __dirname + "/build"
    },

    plugins: [
    	new webpack.HotModuleReplacementPlugin()
    ]
}