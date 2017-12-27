const Router = require('koa-router');
const User = require('../../models/User.js');
const {responseClient} = require('../util');
const tag = require('./tag');
const article = require('./article');

const admin = new Router();

admin.use(async(ctx, next) => {
	if(ctx.session.userInfo){
		await next();
	}else{
		return responseClient(ctx, 200, 1, "身份信息已过期,请重新登录");
	}
})

admin.use('/tag', tag.routes(), tag.allowedMethods());

admin.use('/article', article.routes(), article.allowedMethods());

admin.get('/getUsers', async(ctx) => {
	let skip = ctx.query.pageNum < 0 ? 0 : (ctx.query.pageNum - 1) * 10; 
	let responseData = {
		list: [],
		total: 0
	}

	responseData.total = await User.count();

	let users = await User.find().skip(skip).limit(10);
	if(users){
		responseData.list = users;
		responseClient(ctx, 200, 0, "", responseData);
	}else{
		responseClient(ctx);
	}
})

module.exports = admin;
