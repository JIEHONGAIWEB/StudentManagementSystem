/**
 * 本模板实现的功能是:用户的登录实现与数据库的连接，验证通过登录成功。
 * 将用户的信息与数据库中的信息进行匹配通过就允许登录首页
 */
var express = require('express');
var router = express.Router();
var vipsDbConne = require("./../db/regConne");

/* POST users listing. */
router.post('/', function(req, res, next) {
	
	//1:获取前端post请求的数据,(用户名,密码,邮箱,手机号)
	let username = req.body.userName;
	let userpass = req.body.userPass;
	
	//2:数据库的连接,添加数据
	vipsDbConne.find({
		"username":username,
		"userpass":userpass
	},(data)=>{
		//3:响应数据,添加成功就跳转到登录页面
		if(data){
			//5:登录成功的时候需要进行保存用户的session
			req.session.username = username;
			//6:给客户端进行添加cookie
			res.cookie("username", username);

			console.log(req.session.username);
			
			res.redirect('designs.html');
		}else{
		//4:数据添加不成功的话,跳转到注册的页面，并且提示重新注册
			alert("登录失败");
			res.redirect('login.html');	
		}
		
  		
	});

});

module.exports = router;
