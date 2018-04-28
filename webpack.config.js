const webpack = require('webpack');

module.exports = {
	entry:[
	    'webpack-dev-server/client?http://localhost:8080',
	    'babel-polyfill',
    	     __dirname + '/app/index.js'
        ],

	output: {
	    path: __dirname + "/build",           //打包后的文件存放的地方
	    filename: "bundle.js",                 //打包后的文件名
	    publicPath: "/assets/"
	},

	devtool: 'eval-source-map',

	module: {
	    rules: [
		{
		    test: /(\.jsx|\.js)$/,
		    use: {
			loader: "babel-loader",     //匹配到jsx或js结尾的文件就用babel-loader进行转换,转换过程依次使用plugins和presets制定的扩展
			options: {
				presets: ["env","stage-0" ,"react"],   //从右到左执行
				plugins: [
    				    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
    			        ] 
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
                                    modules: true,
                                    localIdentName: '[name]-[local]-[hash:base64:5]',
                                    importLoaders: 1
                                }
			    },
			    {
				loader: "postcss-loader"
			    }
			],
		     exclude: /node_modules/
	        },

            	//antd专用配置文件,会与css module有冲突 
		{
		    test: /\.css$/,
		    use: [
			    {
				loader: "style-loader"
			    },
			    {
				loader: "css-loader"
			    },
			    {
				loader: "postcss-loader"
			    }
		    ],
		    exclude: /app/
		},

		{
		    test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg|eot|woff|ttf|woff2|svg)$/,
		    use: [
			{
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                                name: '[name].[ext]',
                                outputPath: 'images/'   //图片打包后放在imgs文件夹下
                            }
			}
		    ],
		    exclude: /node_modules/
		}
	    ]
	},

	devServer: {
    	hot: true,
    	host: 'localhost',
    	port: 8080,
    	contentBase: 'build/'
    },

    plugins: [
    	new webpack.HotModuleReplacementPlugin()
    ]
}
