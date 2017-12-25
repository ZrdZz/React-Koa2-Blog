const Router = require('koa-router');
const {responseClient} = require('../util');
const tag = require('../../models/Tag');
const user = require('./user');
const main = new Router();

main.use('user', user.routes(), user.allowedMethods());

main.get('getAllTags', async(ctx) => {
	await tag.find(function(err, doc){
		if(err){
			responseClient(ctx);
		}

		if(doc){
			responseClient(ctx, 200, 0, '请求成功', doc);
		}
	})
})

module.exports = main