const Koa = require('koa');
const historyApiFallback = require('koa2-connect-history-api-fallback');
const koaStatic = require ('koa-static');
const path = require('path');
const mongoose = require('mongoose');
const Router = require('koa-router');
const body = require('koa-bodyparser');
const main = require('./api/main');
const admin = require('./api/admin');
const session = require('koa-session2');

const app = new Koa();
const router = new Router();

app.use(historyApiFallback());  //必须放在前面
app.use(koaStatic(path.join(__dirname, "..", 'public')));
app.use(koaStatic(path.join(__dirname, "..", 'build')));
app.use(body());
app.use(session({
	key: "SESSIONID",
	maxAge: 1000 * 60 * 60
}))

router.use('/', main.routes(), main.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());

app.use(router.routes()).use(router.allowedMethods());

mongoose.Promise = global.Promise;  //不加这个会多个警告Mongoose: mpromise (mongoose's default promise library) is deprecated
mongoose.connect('mongodb://localhost/blog', function(err){
	if(err){
		console.log('数据库连接失败');
	}else{
		console.log('数据库连接成功');
		app.listen(8000);
	}
})


