var mysqlDao=require('./db');
module.exports={
		getMine: function(req, res){
			var sql="select * from tb_user where id=?";
			res.writeHead(200, {"Content-Type":"text/json;charset=utf-8"});
			mysqlDao.query(sql, [req.session.user.id], function(err, rows){
				if(err){
					//一定要对错误有无进行判断
					res.end(JSON.stringify({success: false, result: err.message}));
				}else{
					res.end(JSON.stringify({success: true, result:rows[0]}));
				}
			});
		},
		editInfo:function(req, res){
			var formidable=require("formidable");
			var form=formidable.IncomingForm();
			form.uploadDir="../public/userhead";//文件路径
			form.keepExtensions=true;//保留后缀
			form.parse(req, function(err, fields, files){
				var sql, params;
				res.writeHead(200, {"Content-Type":"text/json;charset=utf-8"});
				if(files.headshot){
					sql="update tb_user set nickname=?,headshot=?,signature=?,mobile=?,sex=?,email=? where id=?";
					params=[fields.nickname,files.headshot.path.replace("..\\public",""),fields.signature,fields.mobile,fields.sex,fields.email,req.session.user.id];
				}else{
					sql="update tb_user set nickname=?,signature=?,mobile=?,sex=?,email=? where id=?";
					params=[fields.nickname,fields.signature,fields.mobile,fields.sex,fields.email,req.session.user.id];
				}
				mysqlDao.query(sql,params,function(err, rows){
					if(err){
						res.end(JSON.stringify({success: false,result: err.message}));
					}else{
						res.end(JSON.stringify({success: true, result: "修改成功"}));
					}
				});
			});
		}
}





