const Router = require('koa-router');
const Article = require('../../models/Article.js');
const {responseClient} = require('../util');
const article = new Router();

article.post('/addArticle', async(ctx) => {
	let {title, content, tags, time, isPublish} = ctx.request.body;
	let author = ctx.session.userInfo.username,
		coverImg = `/${Math.round(Math.random() * 9 + 1)}.jpg`,
		viewCounts = 0,
		commentsCounts = 0;

	let newArticle = new Article({
		title,
		content,
		tags,
		time,
		isPublish,
		author,
		coverImg,
		viewCounts,
		commentsCounts
	});

	let article = await newArticle.save();
	
	if(article){
		if(isPublish === '已发布'){   //这里isPublish被转换为字符串
			responseClient(ctx, 200, 0, '发布成功', article);
		}else{
			responseClient(ctx, 200, 0, '保存成功', article);
		}
	}else{
		responseClient(ctx);
	}
})

module.exports = article