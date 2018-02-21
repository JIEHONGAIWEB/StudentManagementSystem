/**
 * 本模板实现的功能是:用户的注册实现与数据库的连接，
 * 将用户的信息添加到数据库中
 */
var express = require('express');
var router = express.Router();
var vipsDbConne = require("./../db/regConne");

/* POST users listing. */
router.post('/', function(req, res, next) {
	
	//1:获取前端post请求的数据,(用户名,密码,邮箱,手机号)
	let username = req.body.userName;
	let userpass = req.body.userPass;
	let email = req.body.email;
	let phoneNumber = req.body.phoneNumber;
	
	//2:数据库的连接,添加数据
	vipsDbConne.add({
		"username":username,
		"userpass":userpass,
		"email":email,
		"phoneNumber":phoneNumber
	},(data)=>{
		//3:响应数据,添加成功就跳转到登录页面
		if(data){
			res.redirect('login.html');	
		}else{
		//4:数据添加不成功的话,跳转到注册的页面，并且提示重新注册
			alert("注册失败");
			res.redirect('reg.html');	
		}
  		
	});

});

module.exports = router;
