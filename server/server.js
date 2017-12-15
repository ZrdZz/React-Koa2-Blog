const Koa = require('koa');
const historyApiFallback = require('koa2-connect-history-api-fallback');
const koaStatic = require ('koa-static');
const path = require('path');

const app = new Koa();

app.use(historyApiFallback());  //必须放在前面
app.use(koaStatic(path.join(__dirname, "..", 'public')));
app.use(koaStatic(path.join(__dirname, "..", 'build')));

app.listen(3000);


