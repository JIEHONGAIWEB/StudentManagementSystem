
const info = require("./getDesignsInfo.js");

const fs = require("fs");


module.exports = function(request,response){
//增加节点的操作

			// response.write(num);
		// fs.readFile("js/index.js",(err,data)=>{
				response.statusCode = 200;
				response.setHeader("Content-type","application/x-javascript");
				response.write("alert(" + info  + ")");
				response.end();
		// });
		


}