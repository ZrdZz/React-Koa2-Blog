# React-Koa2-Blog

## 基于React + Koa2 + Mongoose的博客

记录一些问题

### webpack配置
webpack中的一些路径像`publicPath`、webpack-dev-server中的一些路径配置还不是很清楚

在使用antd时,引入组件但是没有样式,因为会和css modules冲突,可以针对antd的css单独写一条loader规则,不开启css modules。

### 登录注册功能

大概说一下逻辑

在登陆组件(/app/components/logorreg/Login.js)中点击按钮后,会将`username`和`password`传递给父组件(/app/containers/front/Front.js)传递下来的函数,这个函数是`Front`通过`bindActionCreators`取得的。

`bindActionCreators`的源码的一部分是:
```
function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}
```
他将我们传递进去的`actionCreator`包装一下返回一个新的函数,他就是传给Login.js的函数,调用它时,会将参数传给`actionCreator`,返回一个`action`对象,然后`dispatch`。

这时`watchLogin`会一直等待`action`,当一个与`pattern`匹配的`action`被发起时,会发起`login`任务,然后通过`fetch`将`username`、`password`传递到后台,经过一些数据库的的操作后,将提示信息返回。

```
export function* watchLogin(){
	while(true){
		let req = yield take(actionsTypes.USER_LOGIN);                                       
		let res = yield call(login, req.username, req.password);
		if(res && res.code === 0){
			yield put({type: actionsTypes.SET_MESSAGE, msgType: 1, msgContent: '登陆成功'});
			yield put({type: actionsTypes.RESPONSE_USER_INFO, data: res.data});             
		}
	}
}

export function* login(username, password){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(post, '/user/login', {username, password});
	} catch(err) {
		yield put({type: actionsTypes.SET_MESSAGE, msgType: 0, msgContent: '用户名或密码错误'});
	} finally {
		yield put({type: actionsTypes.FETCH_END});
	}
}

export function* watchRegister(){
	while(true){
		let req = yield take(actionsTypes.USER_REGISTER);                                     
		let res = yield call(register, req.data);
		if(res && res.code === 0){
			yield put({type: actionsTypes.SET_MESSAGE, msgType: 1, msgContent: '注册成功'});           
		}else{
			yield put({type: actionsTypes.SET_MESSAGE, msgType: 0, msgContent: '用户名已存在'});
		}
	}	
}

export function* register(data){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(post, '/user/register', data);
	} catch(err) {
		yield put({type: actionsTypes.SET_MESSAGE, msgType: 0, msgContent: '注册失败'});
	} finally {
		yield put({type: actionsTypes.FETCH_END});
	}
}
```

然后在最外层组件(/app/containers/main.js)中,通过`connect`取出全局的提示信息和用户信息,通过判断显示不同的提示信息。
```
componentDidUpdate(){
  if(this.props.notification && this.props.notification.content){
    if(this.props.notification.type === 1){
      this.openNotification('success', this.props.notification.content)
    }else{
      this.openNotification('error', this.props.notification.content)
    }
  }
}
```

注册功能类似

### 自动登录

自动登录使用`koa-session2`中间件

后端部分

```
app.use(session({
	key: "SESSIONID",
	maxAge: 1000 * 60 * 60
}))
```
第一次登陆成功以后设置session
```
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
                   //登陆成功设置session
                   ctx.session.userInfo = data;
                   responseClient(ctx, 200, 0, '登录成功', data);
            	   return;    		
    	      }
	      responseClient(ctx, 400, 1, '用户名或密码错误');
       })
    }catch(e){
 	  responseClient(ctx);
    }
})
```

当下一次打开网站时发送请求验证是否已登录
```
user.get('user/userInfo', async(ctx) => {  
    if(ctx.session.userInfo){
        responseClient(ctx, 200, 0, '已登录', ctx.session.userInfo);
    }else{
        responseClient(ctx,200,1,'请重新登录',ctx.session.userInfo);
    }
})
```

前端部分

当主页(/app/containers/main.js)加载完成后发送请求
```
  componentDidMount(){
    this.props.user_auth();   
  }
```

### 管理用户界面

用户登陆以后如果是管理员的话会显示一个按钮进入管理页面(/app/components/Logined.js)
```
{this.props.userInfo.userType === 'admin' ?
     <Button onClick={() => this.props.history.push('/admin')} type="primary">点击进入管理页面</Button> :
null}
```

进入用户管理后发起请求,默认参数pageNum为1,即先请求第一页的数据

adminManagerUserSaga.js
```
export function* watch_get_all_users(){
    while(true){
	let req = yield take(managerUserActionsTypes.GET_ALL_USERS);
	let pageNum = req.pageNum || 1;
	let res = yield call(fetch_users, pageNum);
	if(res && res.code === 0){
	    for(let i = 0, len = res.data.list.length; i < len; i++){
	        res.data.list[i].key = i;
	    }
	    let data = {};
            data.total = res.data.total;
            data.list  = res.data.list;
            data.pageNum = pageNum;
            yield put({type:managerUserActionsTypes.RESOLVE_GET_ALL_USERS, data:data})
	}else{
	    yield put({type:actionsTypes.SET_MESSAGE, msgContent:res.message, msgType:0});
	}
    }
}

export function* fetch_users(pageNum){
    yield put({type: actionsTypes.FETCH_START});
    try{
	return yield call(get, `/admin/getUsers/?pageNum=${pageNum}`);
    }catch(err){
        yield put({type: actionsTypes.SET_MESSAGE, msgContent: "网络请求错误", msgType: 0})
    }finally{
	yield put({type: actionsTypes.FETCH_END});
    }
}
```

通过查询字符串将页码传到后端,获取到该页数据后返回。

后端处理
```
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
```

### 内容标签管理

进入标签管理页面以后向后台请求数据

adminManagerTagSaga.js
```
export function* watch_get_all_tags(){
    while(true){
	yield take(managerTagActionsTypes.GET_ALL_TAGS);
	let res = yield call(getAllTags);
	if(res.code === 0){
		let tagsTypeArr = [];
		for(let i = 0, len = res.data.length; i < len; i++){
			tagsTypeArr.push(res.data[i].name);
		}
		yield put({type: managerTagActionsTypes.SET_TAGS, data: tagsTypeArr});
	}else if(res.message === '身份信息已过期,请重新登录'){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
		setTimeout(function(){
			location.replace('/')
		}, 1000)
	}else{
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
	}
    }
}

export function* getAllTags(){
    yield put({type: actionsTypes.FETCH_START});
    try{
	return yield call(get, 'getAllTags');
    }catch(err){
	yield put({type: actionsTypes.SET_MESSAHE, msgContent: '网络请求错误'}, msgType: 0);
    }finally{
	yield put({type: actionsTypes.FETCH_END});
    }
}
```
后端代码很简单,从数据库中取出数据传回saga就好了。

前端代码主要使用了`Tag`组件,通过`connect`取出添加删除标签的方法。添加标签时,按下回车或标签框失去焦点时会触发添加标签的`dispatch`,其余类似。	












































