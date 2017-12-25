const Router = require('koa-router');
const User = require('../../models/User.js');
const {responseClient} = require('../util');
const tag = require('./tag');

const admin = new Router();

admin.use(async(ctx, next) => {
	if(ctx.session.userInfo){
		await next();
	}else{
		responseClient(ctx, 200, 1, "身份信息已过期,请重新登录");
	}
})

admin.use('/tag', tag.routes(), tag.allowedMethods());

admin.get('/getUsers', async(ctx) => {
	let skip = ctx.query.pageNum < 0 ? 0 : (ctx.query.pageNum - 1) * 10; 
	let responseData = {
		list: [],
		total: 0
	}

	responseData.total = await User.count();

	await User.find().skip(skip).limit(10).exec(function(err, doc){
		if(err){
			responseClient(ctx)
		}

		if(doc){
			responseData.list = doc;
			responseClient(ctx, 200, 0, "", responseData);
		}
	})
})

module.exports = admin;
