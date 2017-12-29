# React-Koa2-Blog

## 基于React + Koa2 + Mongoose的博客

记录一些问题

### webpack配置
webpack中的一些路径像`publicPath`、webpack-dev-server中的一些路径配置还不是很清楚

在使用antd时,引入组件但是没有样式,因为会和css modules冲突,可以针对antd的css单独写一条loader规则,不开启css modules。

                                    


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

### 发布保存文章

前端代码
```
return(
    <div>
	<h2>发文</h2>
	<div className={style.mainContainer}>
	    <div className={style.title}>标题</div>
	    <Input placeholder='请输入文章标题' value={this.props.title} onChange={this.titleOnChange}/>
	    <div className={style.title}>分类</div>
	    <Select value={this.props.tags} placeholder='请选择分类' mode="multiple" onChange={this.tagsOnChange} 
	    className={style.select}  >
		{
		    this.props.allTags.slice(1).map(function(item){
			return <Select.Option key={item}>{item}</Select.Option>
		    })
		}
	    </Select>
	    <div className={style.title}>正文</div>
	    <Input.TextArea value={this.props.content} onChange={this.contentOnChange} placeholder='请输入文章内容'
	    autosize={{minRows: 15}}/>
	</div>
	<div className={style.btnContainer}>
	    <Button type="primary" style={{marginLeft: '10px'}} onClick={this.publish}>发布</Button>
	    <Button type="primary" style={{marginLeft: '10px'}} onClick={this.save}>保存</Button>
	    <Button type="primary" style={{marginLeft: '10px'}} onClick={this.preView}>预览</Button>
	</div>
	<Modal 
	    title="文章预览"
	    visible={this.state.visible}
	    onOk={this.handleOk}
	    onCancel={this.handleOk}
	    width={'900px'}
	>
            <div>
                <Markdown source={this.props.content} />
            </div>
	</Modal>
    /div>
)
```

文章内容标题等可以保存在state中,若切换到别的页面再切换回来还可以继续写。
注意保存和发布的区别,只是保存别人看不到文章,发布别人可以看到,后面通过isPublish来判断。

后端代码
```
article.post('/addArticle', async(ctx) => {
    let {title, content, tags, time, isPublish} = ctx.request.body;
    let author = ctx.session.userInfo.username,
	coverImg = `/${Math.round(Math.random() * 9 + 1)}.jpg`,
	viewCounts = 0,
	commentsCounts = 0;
    //id只在编辑文章的时候回传过来,第一次发布或保存时不会传过来
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
```

adminNewArticleSaga.js
```
export function* watchSaveArticle(){
    while(true){
	let req = yield take(newArticleActionsTypes.SAVE_ARTICLE);
	if(req.data.title === ''){
	    yield put({type: actionsTypes.SET_MESSAGE, msgContent: '文章标题不能为空!', msgType: 0});
	}else if(req.data.content === ''){
	    yield put({type: actionsTypes.SET_MESSAGE, msgContent: '文章内容不能为空!', msgType: 0});
	}else if(req.data.tags.length === 0){
	    yield put({type: actionsTypes.SET_MESSAGE, msgContent: '文章分类不能为空!', msgType: 0});
	}

	let res = yield call(saveArticle, req.data);
	if(res.code === 0){
	    yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 1});
	    setTimeout(function(){
		location.replace('/admin/managerArticle');
	    }, 1000);
	}else if(res.message === '身份信息已过期，请重新登录'){
	    yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
	    setTimeout(function(){
		 location.replace('/');
	    }, 1000);
	}else{
	    yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0})
	}
    }
}

export function* saveArticle(data){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(post, `/admin/article/addArticle?id=${data.id}`, data);
	}catch(err){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: '0'});
	}finally{
		yield put({type: actionsTypes.FETCH_END});
	}
}
```

state设计(adminNewArticle.js)
```
const initState = {
    title: '',
    content: '',
    tags: [],
    id: ''
};

export const actionsTypes = {
    UPDATE_TITLE: 'UPDATE_TITLE',
    UPDATE_CONTENT: 'UPDATE_CONTENT',
    UPDATE_TAGS: 'UPDATE_TAGS',
    SAVE_ARTICLE: 'SAVE_ARTICLE',
    SET_ID: 'SET_ID'
};

export const actions = {
    update_title: function(title){
	return{
	    type: actionsTypes.UPDATE_TITLE,
	    title
	}
    },
    update_content: function(content){
	return{
	    type: actionsTypes.UPDATE_CONTENT,
	    content
	}
    },
    update_tags: function(tags){
	return{
	    type: actionsTypes.UPDATE_TAGS,
	    tags
	}
    },
    save_article: function(data){
	return{
	    type: actionsTypes.SAVE_ARTICLE,
	    data
	}
    }
};

export function newArticleReducers(state = initState, action){

    switch(action.type){
	case actionsTypes.UPDATE_TITLE:
	    return{
		...state, title: action.title
	    }
	case actionsTypes.UPDATE_CONTENT:
            return{
		...state, content: action.content
            }
	case actionsTypes.UPDATE_TAGS:
	    return{
		...state, tags: action.tags
	    }
	case actionsTypes.SET_ID:
	    return{
		...state, id: action.id
	    }
        default:
	    return state;
    }
}
```

### 编辑文章

点击编辑按钮,页面会定位到发布文章的页面
```
<Button type="primary" onClick={() => {this.props.edit_article(record._id); this.props.history.push('/admin/newArticle')}}>编辑</Button>
```

被编辑文章的id会被传送到action,然后传送到saga
```
export function* watchEditArticle(){
    while(true){
	let req = yield take(managerArticleActionsTypes.EDIT_ARTICLE);
	let res = yield call(editArticle, req.id);
	if(res.code === 0){
	    yield put({type: newArticleActionsTypes.SET_ID, id: res.data._id});
	    yield put({type: newArticleActionsTypes.UPDATE_TITLE, title: res.data.title});
	    yield put({type: newArticleActionsTypes.UPDATE_CONTENT, content: res.data.content});
	    yield put({type: newArticleActionsTypes.UPDATE_TAGS, tags: res.data.tags});
	}else if (res.message === '身份信息已过期，请重新登录') {
            yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            setTimeout(function () {
                location.replace('/');
            }, 1000);
        }else{
	    yield put({type: actionsTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
	}
    }
}

export function* editArticle(id){
	yield put({type: actionsTypes.FETCH_START});
	try{
		return yield call(get, `/admin/article/editArticle?id=${id}`);
	}catch(err){
		yield put({type: actionsTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
	}finally{
		yield put({type: actionsTypes.FETCH_END});
	}	
}
```













































