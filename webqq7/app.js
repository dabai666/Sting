var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session=require('express-session');


var index = require('./routes/index');
var users = require('./routes/users');
var regist = require('./routes/regist');
var login = require('./routes/login');
var friend=require('./routes/friend');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
/*app.use('/api', function(req,res,next){
	res.end("midware");
	next();
})*/
app.use(express.static(path.join(__dirname, 'public')));
//提供session支持
global.storeMemory = new session.MemoryStore();

app.use(session({
	secret:"webweibo", //必须设定，session cookie值得加密秘钥，用来防止篡改cookie
	key:"appSession",  //默认connect.sid
	cookie:{path:"/",httpOnly:true}, //path:cookie在哪个路径下有效，httpOnly:cookie无法使用document.cookie查看；maxAge:过期时间，毫秒为单位
	store:global.storeMemory  //指定一个存储对象
}));

var auth=function(req, res, next){
	var allowPaths=['/login', '/regist', '/index', '/postLogin', '/checkUserName', '/postRegist'];
	//var url=req.url;
	//var urlObj=require('url').parse(url);
	var url=require("url");
	var urlObj=url.parse(req.url);
	if(req.session.user){
		//已登录，放行
		next();
	}else{
		var isPass=false;
		for(var i in allowPaths){
			if(urlObj.pathname.toLowerCase()==allowPaths[i].toLowerCase()){
				isPass=true;
				break;
			}
		}
		if(isPass){
			next();
		}else{
			if(req.method=="GET"){
				res.redirect("/login");
			}else{
				res.writeHead(403,{'Content-Type':'application/json;charset:utf8'});
				res.end(JSON.stringify({success: false, message: "用户未登录"}));
			}
		}
	}
};

app.use(auth);

app.use('/', index);
//app.use('/users', users);

//注册
app.get('/regist', regist.showView);
app.get('/checkUserName', regist.checkUserName);
app.post('/postRegist', regist.postRegist);

//登录
app.get('/login', login.showView);
app.post('/postLogin', login.postLogin);

//请求列表和添加好友
app.get('/groups', friend.getGroups);
app.get('/friends', friend.getFriendList);
app.post('/searchFriends', friend.searchFriends);
app.post('/addFriend', friend.addFriend);
app.post('/confirmFriend', friend.confirmFriend);
app.post('/getUserInfoById', friend.getInfoById);

//修改信息
app.post('/editInfo',require('./routes/users').editInfo);
app.post('/mine',require('./routes/users').getMine);

//测试
/*app.get('/test',function(req, res, next){
	if(req.query.pass){
		next();
	}else{
		res.end("nopass");
	}
});
app.get("/test", function(req, res, next){
	res.end("pass");
});
 */

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
