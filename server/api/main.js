const Router = require('koa-router');
const {responseClient} = require('../util');
const tag = require('../../models/Tag');
const user = require('./user');
const main = new Router();

main.use('user', user.routes(), user.allowedMethods());

main.get('getAllTags', async(ctx) => {
	let tags = await tag.find();
	if(tags){
		responseClient(ctx, 200, 0, '请求成功', tags);
	}else{
		responseClient(ctx);
	}
})

module.exports = main