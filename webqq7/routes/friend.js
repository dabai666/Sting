var mysqlDao = require('./db');
module.exports = {
	getGroups: function(req, res) {
		res.writeHead(200, {
			"Content-Type": "text/json; charset=utf-8"
		});
		mysqlDao.query('select * from tb_group where userid=?', [req.session.user.id],
			function(err, rows) {
				if(err) {
					res.end(JSON.stringify({
						success: false,
						result: [],
						message: err.message
					}));
				} else {
					res.end(JSON.stringify({
						success: true,
						result: rows
					}));
				}
			});
	},
	getFriendList: function(req, res) {
		res.writeHead(200, {
			"Content-Type": "text/json;charset=utf-8"
		});
		mysqlDao.query('select * from vw_friendship where userid=?', [req.session.user.id],
			function(err, rows) {
				if(err) {
					res.end(JSON.stringify({
						success: false,
						result: [],
						message: err.message
					}));
				} else {
					res.end(JSON.stringify({
						success: true,
						result: rows
					}));
				}
			});
	},
	searchFriends: function(req, res) {
		res.writeHead(200, {
			"Content-Type": "text/json;charset=utf-8"
		});
		var keyword = req.body.kw;
		mysqlDao.query("select * from tb_user where (username like ? or nickname like ? and id <> ?)", ['%' + keyword + '%', '%' + keyword + '%', req.session.user.id], function(err, rows) {
			if(err) {
				res.end(JSON.stringify({
					success: false,
					result: [],
					message: err.message
				}));
			} else {
				for(var i in rows) {
					//遍历查询出的所有的密码段
					delete(rows["password"]);
				}
				res.end(JSON.stringify({
					success: true,
					result: rows
				}));
			}
		});
	},
	addFriend: function(req, res) {
		//添加好友
		res.writeHead(200, {"Content-Type": "text/json;charset:utf-8"});
		var remark = req.body.remark;
		var groupid = req.body.groupid;
		var message = req.body.message;
		var to = req.body.to;
		var from = req.session.user.id;
		mysqlDao.query('insert into tb_addfriend values(?,?,?,?,?,?,?)', [null, from, to, groupid, remark, new Date(), message], function(err, rows) {
			if(err) {
				res.end(JSON.stringify({
					success: false,
					message: err.message
				}));
			} else {
				var socket=global.sessionSocket[to];
				if(socket){
					socket.emit("friendRequest", {message: message, from: from, id: rows.insertId,username: req.session.user.username});
					//socket.emit("friendRequest", {message: message, username: req.session.user.username});
				}
				res.end(JSON.stringify({
					success: true,
					message: "好友请求已发送!"
				}));
			}
		});
	},
	confirmFriend:function(req,res){
			var id=req.body.id;     //tb_addfriend的id
			var groupid=req.body.groupid;  //给对方的分组
			var remark=req.body.remark;  //给给对方的备注
			var pass=req.body.pass;
			res.writeHead(200,{"Content-Type":"text/json;charset=utf-8"});
			mysqlDao.query('select * from tb_addfriend where id=?',[id],function(err,rows){
				if(err){
					res.end(JSON.stringify({success:false,message:err.message}));
				}else{
					if(rows.length==1){
						if(pass=='true'){
							mysqlDao.query('insert into tb_friendship values(?,?,?,?,?)',
									[null,rows[0].from,rows[0].to,rows[0].groupid,rows[0].remark],
									function(err,result1){
								if(err){
									res.end(JSON.stringify({success:false,message:err.message}));				
								}else{
									mysqlDao.query('insert into tb_friendship values(?,?,?,?,?)',[null,rows[0].to,rows[0].from,groupid,remark],function(err,result2){
										if(err){
											res.end(JSON.stringify({success:false,message:err.message}));		
										}else{	
											mysqlDao.query('select * from vw_friendlist where id in ('+result1.insertId+','+result2.insertId+')',function(err,vwResult){
												for(var i in vwResult){
													var socket=global.sessionSocket[vwResult[i].userid];
													if(socket){
														socket.emit("addFriend",vwResult[i]);
													}
												}
											});
											mysqlDao.query('delete from tb_addfriend where id=?',[id],function(){
									          res.end(JSON.stringify({success:true,message:"处理完成"}));
								           });									
										}
									});
								}
							});
						}else{
							mysqlDao.query('delete from tb_addfriend where id=?',[id],function(){
								res.end(JSON.stringify({success:true,message:"处理完成"}));
							})
						}								
					}else{
						res.end(JSON.stringify({success:false,message:"没有找到对应的好友添加请求"}));
					}
				}
			});
		},


	getInfoById: function(req, res){
		res.writeHead(200,{"Content-Type":"text/json;charset=utf-8"});
		//根据id获取用户信息
		var id=req.body.id||req.query.id;
		mysqlDao.query("select * from tb_user where id=?", [id], function(err, rows){
			if(err){
				res.end(JSON.stringify({success: false, result:[], message: err.message}));
			}else{
				for(var i in rows){
						//遍历删除查询出的数据的密码字段
						delete(rows["password"]);
					}
					res.end(JSON.stringify({success:true,result:rows}));	
			}
		})
	}
}