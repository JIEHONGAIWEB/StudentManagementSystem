//构建一个自己的服务器
const http = require("http"); 
const url = require("url");
const path = require("path");

const router = require("./router");

const server = http.createServer((request,response)=>{
	//接受前端的请求,接受的是get 的请求
	let urlObj = url.parse(request.url);
	
	//请求的文件路径
	let pathname = urlObj.pathname.substring(1);

	if( pathname  != 'favicon.ico'){

		//文件的后缀名
		let ext = path.extname(pathname).substring(1);
		console.log(ext);
		//html,jpg,do
		//
			//处理请求（查找router中对应的处理函数，进行处理）
			router[ext](pathname,request,response);
	}

});

server.listen(1207,"127.0.0.1",()=>{
	console.log("AHONG waiting....");
});