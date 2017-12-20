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



