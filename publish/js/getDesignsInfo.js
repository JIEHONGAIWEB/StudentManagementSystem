//本模块的功能是：从数据库中读取数据，动态的生成html的标签个数
//1、如何从数据库中读取数据呢？
//想知道的是json数组集合的长度
const designsDbConne = require("./designsDbConne");
// const $ = require("jquery-1.8.3.min.js");
// const developsDbConne = require("./developsDbConne");
// const operatesDbConne = require("./operatesDbConne");
// const productssDbConne = require("./productssDbConne");


let count = "";
//去数据库中查找数据，并且将值返回给data 
module.exports = function getDesignsInfo(request,response){


	designsDbConne.find(request,response,(data)=>{
		let dataObj = data;
		let length = [];
			// console.log(dataObj);
			 count = data[0]["panel_title"];
		 
		for(let i=0;i<11;i++){
			// 读取到了panel.title的数据
			length.push(data[i]["panel_title"]);
			//读取到了panel.body的长度
			console.log(data[i]["panel_body"].length);	
			// for(let j=0;j<data[i]["panel_body"].length;j++){
			// 	//读取到每一个自己需要的数据
				
			// 	// console.log(data[i]["panel_body"][j]);
			// 	// console.log(data[i]["panel_body"][j][0]["imgTitle_icon"]);
			// 	// console.log(data[i]["panel_body"][j][0]["link"]);	
			// 	// console.log(data[i]["panel_body"][j][0]["title"]);	
			// 	// console.log(data[i]["panel_body"][j][0]["info"]);		
			// 	// console.log(data[i]["panel_body"][j][0]["eye_number"]);		
			// 	// console.log(data[i]["panel_body"][j][0]["praise"]);	

			// }
			
		}


					response.statusCode = 200;
					response.setHeader("Content-type","text/html;charset=utf-8");
					response.write("<h1>"+count+"</h1>");
					response.end();

		// module.exports = count;
});

}
 
	

