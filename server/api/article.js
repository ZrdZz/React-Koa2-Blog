const Router = require('koa-router');
const Article = require('../../models/Article.js');
const {responseClient} = require('../util');
const article = new Router();

article.post('/addArticle', async(ctx) => {
	let id = ctx.query.id || null;            //当编辑时取出id来更新文章
	let {title, content, tags, time, isPublish} = ctx.request.body;
	let author = ctx.session.userInfo.username,
		coverImg = `/${Math.round(Math.random() * 9 + 1)}.jpg`,
		viewCounts = 0,
		commentsCounts = 0;
	if(id){
		const article = await Article.update({_id: id}, {title, content, tags,isPublish, time});
	}else{
		const newArticle = new Article({
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

		const article = await newArticle.save();
	}

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

article.get('/editArticle', async(ctx) => {
	let id = ctx.query.id;
	if(id){
		let editArticle = await Article.findOne({_id: id});
		if(editArticle){
			responseClient(ctx, 200, 0, '', editArticle);
		}else{
			responseClient(ctx);
		}
	}
})

module.exports = article