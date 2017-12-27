const Router = require('koa-router');
const User = require('../../models/User.js');
const {responseClient} = require('../util');

const user = new Router();

user.post('/login', async(ctx) => {
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
        let user = await User.findOne({username, password});
        if(user){
            let data = {};
            data.username = user.username;
            data.userType = user.type;
            data.userId = user._id;
            //登陆成功设置session
            ctx.session.userInfo = data;

            responseClient(ctx, 200, 0, '登录成功', data);
            return
        }else{
            responseClient(ctx);
            return
        }
        responseClient(ctx, 400, 1, '用户名或密码错误');
 	}catch(e){
 		responseClient(ctx);
 	}

})

user.post('/register', async(ctx) => {
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
        // await User.findOne({username}, function(err, doc){
        //     if(err){
        //        return responseClient(ctx);
        //     }

        //     if(doc){
        //         responseClient(ctx, 200, 1, '用户名已存在');
        //         return;  
        //     }else{
        //         //保存到数据库
        //         let user = new User({
        //             username: username,
        //             password: password,
        //             type: 'user'
        //         });

        //         user.save(function(err, doc){
        //             if(err){
        //                 console.log(err);
        //             }
        //             if(doc){
        //                 let data = {};
        //                 data.username = doc.username;
        //                 data.userType = doc.type;
        //                 data.userId = doc._id;
        //                 responseClient(ctx, 200, 0, '注册成功', data);
        //                 return;
        //             }
        //         });   
        //     }
        // })

        let isRegister = await User.findOne({username})
        if(isRegister){
            responseClient(ctx, 200, 1, '用户名已存在');
            return
        }else{
            let user = new User({
                    username: username,
                    password: password,
                    type: 'user'
                });

            let newUser = await user.save();
            let data = {};
            data.username = newUser.username;
            data.userType = newUser.type;
            data.userId = newUser._id;
            responseClient(ctx, 200, 0, '注册成功', data);
            return;
        }
    }catch(e){
        return responseClient(ctx);
    }

})

user.get('/userInfo', async(ctx) => {  
    if(ctx.session.userInfo){
        return responseClient(ctx, 200, 0, '已登录', ctx.session.userInfo);
    }else{
        return responseClient(ctx,200,1,'请重新登录',ctx.session.userInfo);
    }
})

module.exports = user;