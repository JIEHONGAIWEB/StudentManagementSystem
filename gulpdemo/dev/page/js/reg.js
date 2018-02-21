/**
 * 本模板实现的功能是实现注册页面的前端正则验证通过的功能
 */
//1:用户名的正则验证的要求:用户名没有什么具体的要求
//2:密码的正则验证要求:必须设置长度为6位以上的密码

$("#userPass").blur(function (){
	let length = $(this).val().length;
	if( length > 6){
		return;
	}else{
		console.log("密码长度必须大于6位");
	}
});

//3:确认密码的正确性
$("#aginPwd").blur(function (){
	
	if( $(this).val() == $("#userPass").val()){
		return;
	}else{
		console.log("确认密码有误");
	}

});

//4:邮箱的正则验证要求
$("#email").blur(function (){ 
	
	
});
//5:手机号的正则验证要求



