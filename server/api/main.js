const Router = require('koa-router');
const {responseClient} = require('../util');
const Tag = require('../../models/Tag');
const Article = require('../../models/Article');
const user = require('./user');
const main = new Router();

main.use('user', user.routes(), user.allowedMethods());

main.get('getAllTags', async(ctx) => {
	let tags = await Tag.find();
	if(tags){
		responseClient(ctx, 200, 0, '请求成功', tags);
	}else{
		responseClient(ctx);
	}
});

main.get('getAllArticles', async(ctx) => {
	let pageNum = ctx.query.pageNum || 1,
		tag = ctx.query.tag || null,
		skip = pageNum < 0 ? 0 : (pageNum - 1) * 5; 

	let responseData = {
		total: 0,
		articlesList: []
	};

	if(tag){
		responseData.total = await Article.count({tags: {$all: [tag]}});
		responseData.articlesList = await Article.find({tags: {$all: [tag]}}).sort({_id: -1}).skip(skip).limit(5);
	}else{
		responseData.total = await Article.count();
		responseData.articlesList = await Article.find().sort({_id: -1}).skip(skip).limit(5);
	}

	if(responseData.articlesList){
		responseClient(ctx, 200, 0, "success", responseData);
	}else{
		responseClient(ctx);
	}	

})

main.get('getArticleDetail', async(ctx) => {
	let id = ctx.query.id;
	if(id){
		let detail = await Article.findOne({_id: id});
		let viewCounts = detail.viewCounts + 1;
		await Article.update({_id: id}, {viewCounts});
		if(detail){
			responseClient(ctx, 200, 0, 'success', detail);
		}else{
			responseClient(ctx);
		}
	}
})

module.exports = main