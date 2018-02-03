//本模块的功能就是具体的处理请求的操作并且进行响应
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
module.exports = {
	"html":function(filename,request,response){
		//是html文件进行寻找文件然后返回给浏览器
		fs.readFile(filename,"utf8",(error,data)=>{
			response.statusCode = 200;
			response.setHeader("Content-type","text/html;charset=utf-8");
			response.write(data,"utf8");
			response.end();
		});
	},
	"css":function(filename,request,response){
		//是html文件进行寻找文件然后返回给浏览器
		fs.readFile(filename,"utf8",(error,data)=>{
			response.statusCode = 200;
			response.setHeader("Content-type","text/css;charset=utf-8");
			response.write(data);
			response.end();
		});
	},
	
	"js":function(filename,request,response){
		//是html文件进行寻找文件然后返回给浏览器
		fs.readFile(filename,(error,data)=>{
			response.statusCode = 200;
			response.setHeader("Content-type","application/x-javascript");
			response.write(data);
			response.end();
		});
	},

	"do":function(filename,request,response){
		
		switch(filename){

			//请求注册的处理
			case "reg.do":{
				reg(request,response);
			}break;

			//请求登录的处理
			case "login.do":{
				login(request,response);
			}break;

			//用户名的可用性检查
			case "usercheck.do":{
				usercheck(request,response);
			}break;
		}
		
		

	},



	//图片文件的寻找
	"jpg":function(filename,request,response){
		
		fs.readFile(filename,"binary",(error,data)=>{
			response.statusCode = 200;
			response.setHeader("Content-type","image/jpeg");
			
			response.write(data,"binary");
			response.end();
		});

	}







}

function reg(request,response){
	//1、接受前端传输过来的数据
	//post请求的处理
	let queryStr = "";
	request.on("data",(chunk)=>{
		queryStr += chunk;
	})
	request.on("end",()=>{
			//2、处理数据
		let queryObj = querystring.parse(queryStr);
			console.log(queryObj.username);
			console.log(queryObj.userpass);
			console.log(queryObj.age);

		//3、连接数据库
		vips.add({
			"username":queryObj.username,
			"userpass":queryObj.userpass,
			"age":queryObj.age
		},function(isSuccess){
			if(isSuccess){
				response.statusCode = 200;
				response.setHeader("Content-type","text/html;charset=utf-8");
				response.write("注册成功！");
				response.end();
			}else{
				response.statusCode = 200;
				response.setHeader("Content-type","text/html;charset=utf-8");
				response.write("注册失败！");
				response.end();
			}

		})
		//4、进行响应
		//5、结束响应
	});

	
}