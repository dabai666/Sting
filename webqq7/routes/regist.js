/**
 * New node file
 */
module.exports={
		showView: function(req,res){
			//提交get请求，调用模板引擎
			res.render('regist',{title: "欢迎注册WebQQ"});
		},
		checkUserName: function(req,res){
		//判断用户名是否被注册
			var username=req.query['username'];
			res.writeHead(200, {"Content-Type":"text/json;charset=utf8"});
			var mysqlDao=require('./db');
			mysqlDao.query('select count(*) as count from tb_user where username=?',
			[username],function(err,rows){
				if(err){
					res.end(JSON.stringify({success: false, message: err.message}));
				}else{
					console.log(rows);
					if(rows[0].count>0)
						res.end(JSON.stringify({success: false}));
					else
						res.end(JSON.stringify({success: true}));
				}
			});
		},
		postRegist:function(req, res){
			//注册
			var username=req.body["username"];
			var password=req.body['password'];
			var errcount=0;
			if(!/^[A-Za-z][A-Za-z0-9_]{2,9}$/.test(username)) errcount++;
			if(!(password.length>5 && password.length<17))  errcount++;
			
			res.writeHead(200, {"Content-Type":"text/json;charset=utf8"});
			if(errcount>0){
				res.end(JSON.stringify({success:false,message:'数据验证不正确！'}));
			}
			var mysqlDao=require('./db');
			mysqlDao.query('insert into tb_user(`username`, `password`) values(?, md5(?))',
			[username,password], function(err,rows){
				if(err){
					res.end(JSON.stringify({success: false, message: "注册失败"}));
				}else{
					//req.session.user={id: rows[0].id, username: rows[0].username};
					res.end(JSON.stringify({success: true, message: "注册成功"}));
				}
			});
		}
}







