const Router = require('koa-router');
const {responseClient} = require('../util');
const Tag = require('../../models/Tag.js');
const tag = new Router();

tag.post('/addTag', async(ctx) => {
	let {name} = ctx.request.body;
	
	// await Tag.findOne({name}, function(err, doc){
	// 	if(err){
	// 		responseClient(ctx);
	// 	}

	// 	if(doc){
	// 		responseClient(ctx, 200, 1, '该标签已存在');
	// 	}else{
	// 		let newTag = new Tag({name});
	// 		newTag.save(function(err, doc){
	// 			if(err){
	// 				console.log(err);
	// 			}

	// 			if(doc){
	// 				responseClient(ctx, 200, 0, doc);
	// 			}
	// 		})
	// 	}
	// })

	try{
		let tag = await Tag.findOne({name});

		if(tag){
			responseClient(ctx, 200, 1, '该标签已存在');
		}else{
			let newTag = new Tag({name});
			let doc = await newTag.save();
			responseClient(ctx, 200, 0, '添加成功', doc);
		}
	}catch(err){
		responseClient(ctx);
	}
})

tag.post('/deleteTag', async(ctx) => {
	let {name} = ctx.request.body;
	try{
		let delTag = await Tag.remove({name});
		if(delTag){
			responseClient(ctx, 200, 0, '删除成功');
		}
	}catch(err){
		responseClient(ctx);
	}
})

module.exports = tag