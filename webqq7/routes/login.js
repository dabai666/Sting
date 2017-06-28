/**
 * New node file
 */
module.exports={
		showView: function(req,res){
			//提交get请求，调用模板引擎
			res.render('login',{title: "欢迎登录WebQQ"});
		},
		postLogin: function(req,res){
			//提交post请求，登录
			var mysqlDao=require('./db');
			//var username=req.body["username"];
			var username=req.body.username;
			var password=req.body.password;
			mysqlDao.query('select * from tb_user where username=? and password=md5(?)',
					[username,password],
					function(err,rows){
				if(err){
					res.end(JSON.stringify({success:false, message:err.message}));
				}else{
					if(rows.length>0){
						req.session.user={id:rows[0].id,username: rows[0].username};
						res.end(JSON.stringify({success: true, message:"登录成功"}));
					}else{
						res.end(JSON.stringify({success: false, message: "用户名或密码错误"}));
					}
				}
			});
		}
}