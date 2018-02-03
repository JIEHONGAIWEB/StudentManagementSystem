//本模板主要完成的是，进行数据的获取，然后先存入自己的数据库中
const http = require("http");
const cheerio = require("cheerio");
const dbconne = require("./dbconne");



http.get("http://www.chuangzaoshi.com/operate",(res)=>{
	let html ='';

	res.on("data",(data)=>{
		html += data;
	});
	res.on("end",()=>{
		 let parentStr = getInfo(html);
		 // console.log(parentStr);
		 dbconne.add(parentStr,function(isSuccess){
				if(isSuccess){
					console.log("添加成功！");
				}else{
					console.log("添加失败！");
				}
		});

	});
	
});
function getInfo(html){
	// console.log(html);
	
	let $ = cheerio.load(html);

	let test = [];
	let father = [];

	//对每一个传进来的字符串进行处理==去除空格
	function kongge(str){
	
		let strNew="";
		for(let i =0;i<str.length;i++){

		    let reg = /\s/;
		    if(reg.test(str.charAt(i))){
		        continue;
		    }else{
		      strNew += str.charAt(i);
		    }
		}
		  return strNew ;
		  
	}
	//我的13个panel对象
	
	//创建每一个panel对象
	let title = $(".panel-title");

	title.each(function(){
		let txt = $(this).text();
		test.push(txt);
	});

 let length = test.length;
 
	for(let i=0;i<length;i++){

		let panel = {
			"panel_title":"",
			"panel_body":[]
		};
		
		let titleTemp = $(".panel-title").eq(i).text();
		
		panel.panel_title =  kongge(titleTemp);

		let row = $(".row").eq(i).children();
		
		for(let j=0;j<row.length;j++){
			let tempBox = [];
			let cell = {
					"imgTitle_icon":"",
					"title":"",
					"info":"",
					"eye_number":"",
					"praise":""
				};

			row.eq(j).each(function(){
				//row的每一个孩子
				 cell = {
					"imgTitle_icon":"",
					"title":"",
					"info":"",
					"link":"",
					"eye_number":"",
					"praise":""
				};

				let imgTitle = $(this).find(".card-icon").children().eq(0).attr("src");
				cell.imgTitle_icon=kongge(imgTitle);

				let linkValue = $(this).find(".card-heading").attr("title");
				cell.link=kongge(linkValue);

				let titleValue = $(this).find(".card-title").text();
				cell.title = kongge(titleValue);

				let infoValue = $(this).find(".card-body").text();
				cell.info = kongge(infoValue);

				let eye_numberValue = $(this).find(".card-footer").find(".btn-view").children().find("span").text();
				cell.eye_number = kongge(eye_numberValue);

				let praiseValue = $(this).find(".card-footer").find(".count").text();
				cell.praise = kongge(praiseValue);

				tempBox.push(cell);

			});

			panel.panel_body.push(tempBox);
			
		}//end for j

		
		father.push(panel);


	}//end i
	

	return father;
}//end function











