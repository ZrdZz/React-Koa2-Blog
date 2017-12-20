const Router = require('koa-router');
const User = require('../../models/User.js');
const {responseClient} = require('../util');

const user = new Router();

user.post('user/login', async(ctx) => {
	let {username, password} = ctx.request.body;
    if (!username) {
        responseClient(ctx, 400, 2, '用户名不可为空');
        return;
    }
    if (!password) {
        responseClient(ctx, 400, 2, '密码不可为空');
        return;
    }

 	try{
   		await User.findOne({username, password}, function(err, doc){
    		if(err){
    			responseClient(ctx);
    		}

    		if(doc){
				let data = {};
            	data.username = doc.username;
            	data.userType = doc.type;
            	data.userId = doc._id;

            	responseClient(ctx, 200, 0, '登录成功', data);
            	return;    		
    		}

    		responseClient(ctx, 400, 1, '用户名或密码错误');
    	})
 	}catch(e){
 		responseClient(ctx);
 	}

})

user.post('user/register', async(ctx) => {
    let {username, password, rePassword} = ctx.request.body;
    
    if (!username) {
        responseClient(ctx, 400, 2, '用户名不可为空');
        return;
    }
    if (!password) {
        responseClient(ctx, 400, 2, '密码不可为空');
        return;
    }
    if (password !== rePassword) {
        responseClient(ctx, 400, 2, '两次密码不一致');
        return;
    }   

    try{
        await User.findOne({username: username}, function(err, doc){
            if(err){
                responseClient(ctx);
            }

            if(doc){
                responseClient(ctx, 200, 1, '用户名已存在');
                return;  
            }else{
                //保存到数据库
                let user = new User({
                    username: username,
                    password: password,
                    type: 'user'
                });

                user.save(function(err, doc){
                    if(err){
                        console.log(err);
                    }
                    if(doc){
                        let data = {};
                        data.username = doc.username;
                        data.userType = doc.type;
                        data.userId = doc._id;
                        responseClient(ctx, 200, 0, '注册成功', data);
                        return;
                    }
                });   
            }
        })
    }catch(e){
        responseClient(ctx);
    }
})

module.exports = user;