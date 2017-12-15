module.exports = {
	entry: __dirname + "/app/index.js",       //入口文件

	output: {
		path: __dirname + "/build",           //打包后的文件存放的地方
		filename: "bundle.js"                 //打包后的文件名
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
			}
		]
	}
}